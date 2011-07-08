package uk.org.freshair.android;

import java.io.IOException;
import android.app.Activity;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnErrorListener;
import android.media.MediaPlayer.OnInfoListener;
import android.media.MediaPlayer.OnPreparedListener;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.ToggleButton;

public class FreshAirRadio extends Activity implements
		OnCompletionListener, OnErrorListener,
		OnInfoListener, OnPreparedListener {

	private static final String STREAM_URI = "http://129.215.16.20:3066/;";

	private ToggleButton button_play;
	private Button button_quit;
	private ProgressBar progress_main;
	private TextView text_info;

	MediaPlayer mediaPlayer;

	private Activity rootActivity;

	private boolean isPlaying = false;

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
						onError(mediaPlayer, -1, -1);
						return;
					} catch (IllegalStateException e) {
						onError(mediaPlayer, -1, -1);
						return;
					} catch (IOException e) {
						onError(mediaPlayer, -1, -1);
						return;
					}
				}

				// if we wanted to stop
				if (isPlaying || (mediaPlayer != null && mediaPlayer.isPlaying()) ) {
					
					if(mediaPlayer.isPlaying()){
						mediaPlayer.stop();
					}
					mediaPlayer.release();
					mediaPlayer = null;
					
					text_info.setText("");
					isPlaying = false;
					
				// if we wanted to start
				} else {
					try {
						mediaPlayer.prepareAsync();
						text_info.setText("Loading ...");
						isPlaying = true;
					} catch (IllegalStateException e) {
						onError(mediaPlayer, -1, -1);
					}
				}
			}
		});
		
	}

	public void onPrepared(MediaPlayer mp) {
		if(mp == null)
			return;
		Log.v("FreshAir", "playStarted Update UI (Playing)");
		
		try {
			mp.start();
		} catch (IllegalStateException e) {
			onError(mp, -1, -1);
		}

		text_info.setText("Playing ...");
		progress_main.setVisibility(View.INVISIBLE);
		button_play.setChecked(true);

	}

	public void onCompletion(MediaPlayer mp) {
		if(mp == null)
			return;
		
		mp.release();
		mp = null;
		
		isPlaying = false;

		text_info.setText("Stoped");
		button_play.setChecked(false);
		progress_main.setVisibility(View.INVISIBLE);

	}

	public boolean onError(MediaPlayer mp, int what, int extra) {
		Log.v("FreshAir", "onError (" + what + ")");
		
		if(mp != null){
			mp.release();
			mp = null;
		}
		isPlaying = false;

		text_info.setText("Error: Please Retry");
		button_play.setChecked(false);
		progress_main.setVisibility(View.INVISIBLE);

		return true; // return true to stop OS calling 'onCompletion'
	}

	public boolean onInfo(MediaPlayer mp, int what, int extra) {
		// TODO: currently the getMetadata method is not present
		
		Log.v("FreshAir", "onInfo (" + what + " - " + extra + ")");
		
		switch (what) {
		case 701: //MediaPlayer.MEDIA_INFO_BUFFERING_START:			
			text_info.setText("Buffering ...");
			progress_main.setVisibility(View.VISIBLE);
			isPlaying = true; // ie you cant re set the data sourse without
								// stoping first
			
			button_play.setChecked(true);
			break;
		
		case 702: //MediaPlayer.MEDIA_INFO_BUFFERING_END:			
			text_info.setText("Playing ...");
			progress_main.setVisibility(View.INVISIBLE);
			isPlaying = true;
			
			button_play.setChecked(true);
		
		default:
			break;
		}
		
		return true; // return true to stop the OS calling 'onError'
	}
	
	@Override
	public void finish() {
		
		if(mediaPlayer != null){
			if (mediaPlayer.isPlaying())
				mediaPlayer.stop();
			try {
				mediaPlayer.release();
			} catch (Exception e) {
				// just ignore
			}
		}
		mediaPlayer = null;
		isPlaying = false;
		button_play.setChecked(false);
		super.finish();
	}

}