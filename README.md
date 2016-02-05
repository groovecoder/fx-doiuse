#doiuse
Lint CSS for browser support against caniuse database; using doiuse library

![fx-doiuse
demo](https://raw.github.com/groovecoder/fx-doiuse/doiuse.com/demo.gif)

## Usage
For now, this is a clunky prototype

1. Set `xpinstall.signatures.required` to `false` in `about:config`

2. Install the
   [`.xpi`](https://raw.github.com/groovecoder/fx-doiuse/doiuse.com/@fx-doiuse-0.0.1.xpi) from your [`about:addons`](about:addons)
   and restart Firefox

3. Open the Developer Tools "doiuse" panel

4. Set your Development Domains

5. Go to one of your development domains

You will get an alert for each stylesheet on the page, showing all of the CSS
incompatibilities as reported by [moz-doiuse](https://moz-doiuse.herokuapp.com).

## Dev Setup
Add-on coding can be a bit tricky. There are great docs on MDN for Add-ons and
the Add-on SDK. But they may be more than you need to work on this. So here's a
tl;dr version ...

1. (Suggested) [Create a new profile](https://support.mozilla.org/kb/profile-manager-create-and-remove-firefox-profiles) for fx-doiuse

2. Set these [recommended about:config](https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Recommended_development_preferences) values in the profile:

        devtools.chrome.enabled = true
        devtools.debugger.remote-enabled = true
        xpinstall.signatures.required = false

3. [Install jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation) on your machine

4. Clone this repo:

        git clone git://github.com/groovecoder/fx-doiuse.git

5. `jpm run` to run Firefox with the add-on:

        cd fx-doiuse
        jpm run [-p fx-doiuse]

## What's next?

See [Issues](https://github.com/groovecoder/fx-doiuse/issues) for the planned features.

## Credits

Icons by [Hand-Drawn Goods Brainy Icons
Free](http://handdrawngoods.com/store/brainy-icons-free/)
