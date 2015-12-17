#doiuse
Lint CSS for browser support against caniuse database; using doiuse library

## Dev Setup
Add-on coding can be a bit tricky. There are great docs on MDN for Add-ons and
the Add-on SDK. But they may be more than you need to work on this. So here's a
tl;dr version ...

1. (Suggested) [Create a new profile](https://support.mozilla.org/kb/profile-manager-create-and-remove-firefox-profiles) for fx-doiuse

2. Set these [recommended about:config](https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Recommended_development_preferences) values in the profile:


        devtools.chrome.enabled = true
        devtools.debugger.remote-enabled = true
        xpinstall.signatures.required = false

3. Install [Extension Auto-Installer](https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/) Add-on into the new profile

4. [Install jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation) on your machine

5. Clone this repo:


        git clone git://github.com/groovecoder/fx-doiuse.git

6. Run `jpm watchpost` to automatically watch and update add-on code in Firefox:


        cd fx-doiuse
        jpm watchpost --post-url http://localhost:8888/

## Usage
For now, this is a clunky prototype

1. Install `doiuse` globally so the binary is available to the add-on:


        npm install -g doiuse

2. Sym-link `node` into `/usr/bin/` so `doiuse` can find `node`


        sudo ln -s /usr/local/bin/node /usr/bin/node

3. Go to
   [https://developer.allizom.org/](https://developer.allizom.org/)

You will see a green outline around the document. Yay! You will also see some
alerts with *real* output from running `doiuse` on *fake* styles.

See [Issues](https://github.com/groovecoder/fx-doiuse/issues) for the planned features.
