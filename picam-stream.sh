#!/bin/bash

# =================================================================
# Stream configuration file for Raspberry Pi Camera
#
# Original author Russell Feldhausen (russfeldh@gmail.com)
# original file can be found at:
# https://gist.github.com/russfeld/0878b1f8eaf7409136b9125ce5e1458f
#
# Ripped of from Russ and updated by Thomas Cannon to abstract out the stream key
#
# In order to call in the key, you need to create a new file called key.conf
# This file should have one line as follows:
# STREAM_KEY="PUT YOUR TWITCH STREAM KEY HERE"
#
# This set of commands should allow you to stream video from your 
# Raspberry Pi Camera to Twitch and Youtube (and possibly other
# RTMP endpoints) with decent quality and performance.
#
# You may need to install raspivid and/or ffmpeg to use this script.
# =================================================================


# Set width and height of output video
WIDTH=1920
HEIGHT=1080

# Set output framerate
FRAMERATE=30

# Set keyframe spacing (must be double the framerate)
KEYFRAME=60

# Set bitrate (Twitch recommends 3500000)
BITRATE=3500000

# Set stream URL
URL="rtmp://live.twitch.tv/app/"

# Set stream key
source key.conf
KEY=$STREAM_KEY

# Command
raspivid -n -t 0 -w $WIDTH -h $HEIGHT -fps $FRAMERATE -b $BITRATE -g $KEYFRAME -o - | ffmpeg -f lavfi -i anullsrc -c:a aac -r $FRAMERATE -i - -g $KEYFRAME -strict experimental -threads 4 -vcodec copy -map 0:a -map 1:v -b:v $BITRATE -preset ultrafast -f flv "${URL}/${KEY}"

# =================================================================
# Full Documentation of Command Options
# 
# +++ raspivid +++
# -n = no preview window
# -t = time to capture (0 to disable, which allows streaming)
# -w = video width
# -h = video height
# -fps = output framerate (max 30 for 1080p, 60 for 720p)
# -b = bitrate
# -g = keyframe rate (refresh period)
# -o - = output to stdout (allows piping to ffmpeg)
#
# +++ ffmpeg +++
# -f lavfi = use lavfi filter (see note below)
# -i anullsrc = grab blank input (see note below)
# -c:a aac = set audio codec to aac
# -r = output framerate (should match raspivid framerate)
# -i - = read input from stdin (piped from ffmpeg)
# -g = keyframe rate (refresh period)
# -strict experimental = allow nonstandard things
# -threads 4 = set number of encoding threads to 4 (# of cores)
# -vcodec copy = use video as-is (do not re-encode video)
# -map 0:a = use the audio from input 0 (see note below)
# -map 1:v = use the video from input 1 (raspivid)
# -b:v = bitrate
# -preset ultrafast = use the ultrafast encoding preset
# -f flv = set output format to flv for streaming
# "${URL}/{KEY}" = specify RTMP URL as output for stream
#
# ** NOTE **
# According to some information online, YouTube will reject a live
# stream without an audio channel. So, in the ffmpeg command above
# a blank audio channel is included. It was not required for Twitch
# in my testing. 
# =================================================================