cmd := /opt/homebrew-cask/Caskroom/google-chrome/latest/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
headless:
	$(cmd) --headless --disable-gpu \
  		--remote-debugging-port=9222 \
  		https://www.chromestatus.com

print-dom:
	$(cmd) --headless --disable-gpu --dump-dom https://www.chromestatus.com/

pdf:
	$(cmd) --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/

screenshots:
	$(cmd) --headless --disable-gpu --screenshot \
		--window-size=1280,1696 https://www.chromestatus.com/

repl:
	$(cmd) --headless --disable-gpu \
		--repl https://www.chromestatus.com/

# https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc
