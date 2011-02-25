package uk.org.freshair.android;

import java.io.IOException;
import android.app.Activity;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnBufferingUpdateListener;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnErrorListener;
import android.media.MediaPlayer.OnInfoListener;
import android.media.MediaPlayer.OnPreparedListener;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.ToggleButton;

public class FreshAirRadio extends Activity implements
		OnBufferingUpdateListener, OnCompletionListener, OnErrorListener,
		OnInfoListener, OnPreparedListener {

	private static final String STREAM_URI = "http://129.215.16.20:3066";

	private ToggleButton button_play;
	private Button button_quit;
	private ProgressBar progress_main;
	private TextView text_info;

	MediaPlayer mediaPlayer;

	private Activity rootActivity;

	private boolean isPlaying = false;
	private boolean isBuffering = false;

	private int lastPosition = 0;
	private long updateBufferRateLimit = 0;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {

		Log.v("FreshAirRadio", "Starting up ....");

		// get are self
		rootActivity = this;

		// make sure we are a Activity
		super.onCreate(savedInstanceState);

		// show the UI quickly
		setContentView(R.layout.main);

		// get the UI elemntns
		button_play = (ToggleButton) findViewById(R.id.ToggleButton_Play);
		button_quit = (Button) findViewById(R.id.Button_Quit);
		progress_main = (ProgressBar) findViewById(R.id.ProgressBar_Main);
		text_info = (TextView) findViewById(R.id.TextView_Info);

		// Quit button
		button_quit.setOnClickListener(new View.OnClickListener() {

			public void onClick(View v) {
				// Perform action on click

				Log.v("FreshAir", "Quit button pressed");
				rootActivity.finish();

			}
		});

		// Play button
		button_play.setOnClickListener(new View.OnClickListener() {

			public void onClick(View v) {
				// Perform action on click

				Log.v("FreshAir", "Play/stop button pressed");

				if (mediaPlayer == null) {
					mediaPlayer = new MediaPlayer();
					mediaPlayer
							.setOnBufferingUpdateListener((OnBufferingUpdateListener) rootActivity);
					mediaPlayer
							.setOnCompletionListener((OnCompletionListener) rootActivity);
					mediaPlayer
							.setOnErrorListener((OnErrorListener) rootActivity);
					mediaPlayer
							.setOnInfoListener((OnInfoListener) rootActivity);
					mediaPlayer
							.setOnPreparedListener((OnPreparedListener) rootActivity);
					try {
						mediaPlayer.setDataSource(STREAM_URI);
					} catch (IllegalArgumentException e) {
						text_info.setText("Error!");
						mediaPlayer = null;
					} catch (IllegalStateException e) {
						text_info.setText("Error!");
						mediaPlayer = null;
					} catch (IOException e) {
						text_info.setText("Error!");
						mediaPlayer = null;
					}
				}

				// if we wanted to stop
				if (isPlaying || mediaPlayer.isPlaying()) {
					
					if(mediaPlayer.isPlaying()){
						mediaPlayer.stop();
						mediaPlayer.release();
					}
					text_info.setText("");
					isPlaying = false;
					
				// if we wanted to start
				} else {
					try {
						mediaPlayer.prepareAsync();
						text_info.setText("Loading ...");
						isPlaying = true;
					} catch (IllegalStateException e) {
						text_info.setText("Error!");
					}
				}
			}
		});

		/*
		Timer tick = new Timer("Buffering tick", false);
		tick.scheduleAtFixedRate(new Tick(), 1 * 1000, 1 * 1000);
		*/
		
	}

	public void onPrepared(MediaPlayer mp) {
		if(mp == null)
			return;
		Log.v("FreshAir", "playStarted Update UI (Playing)");

		mp.start();
		//isPlaying = true;
		lastPosition = 0;

		text_info.setText("Playing ...");
		progress_main.setVisibility(View.INVISIBLE);
		button_play.setChecked(true);

	}

	public void onCompletion(MediaPlayer mp) {
		if(mp == null)
			return;
		
		mp.release();
		isPlaying = false;

		text_info.setText("Stoped");
		button_play.setChecked(false);
		progress_main.setVisibility(View.INVISIBLE);

	}

	public boolean onError(MediaPlayer mp, int what, int extra) {
		Log.v("FreshAir", "onError (" + what + ")");
		
		if(mp != null){
			mp.release();
		}
		isPlaying = false;

		text_info.setText("Error: Please Retry");
		button_play.setChecked(false);
		progress_main.setVisibility(View.INVISIBLE);

		return true; // return true to stop OS calling 'onCompletion'
	}

	public void onBufferingUpdate(MediaPlayer mp, int percent) {
		if (!isPlaying || mp == null)
			return;
		
		/*
		if(SystemClock.uptimeMillis() > updateBufferRateLimit+500){
			updateBufferRateLimit = SystemClock.uptimeMillis();
		} else {
			return;
		}
		
		Log.v("FreshAir", "onBufferingUpdate (" + percent + "%) + ("
				+ Integer.MAX_VALUE + ")(" + (percent & 0xFFFF)+1 + ")"); //0x8000
		
		int oldPos = lastPosition;
		lastPosition = mp.getCurrentPosition();
		if (lastPosition > oldPos) {
			isBuffering = false;
		} else {
			if (isPlaying)
				isBuffering = true;
		}
		
		*/
		
		if (isBuffering) {
			text_info.setText("Buffering ...");
			progress_main.setVisibility(View.VISIBLE);
			isPlaying = true; // ie you cant re set the data sourse without
								// stoping first
		} else {
			text_info.setText("Playing ...");
			progress_main.setVisibility(View.INVISIBLE);
			isPlaying = true;
		}
		button_play.setChecked(true);
	}

	public boolean onInfo(MediaPlayer mp, int what, int extra) {
		// TODO: currently the getMetadata method is not present
		
		Log.v("FreshAir", "onInfo (" + what + " - " + extra + ")");
		
		if(what == 701){
			isBuffering = true;
		} else if (what == 702){
			isBuffering = false;
		}
		
		return true; // return true to stop the OS calling 'onError'
	}
	
	@Override
	public void finish() {
		
		if(mediaPlayer != null && mediaPlayer.isPlaying()){
				mediaPlayer.stop();
				mediaPlayer.release();
		}
		super.finish();
	}
	
	/*
	private class Tick extends TimerTask {

		@Override
		public void run() {
			if (mediaPlayer != null) {
				int oldPos = lastPosition;
				lastPosition = mediaPlayer.getCurrentPosition();
				if (lastPosition > oldPos) {
					if (isPlaying)
						isBuffering = true;
				} else {
					isBuffering = false;
				}
			}
		}

	}
	*/

}