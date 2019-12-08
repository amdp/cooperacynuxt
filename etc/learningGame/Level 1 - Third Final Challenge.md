# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)

## FINAL CHALLENGE LEVEL ONE: INSTALL NODE, NPM AND NUXT

First of all, you should know node is based on npm,
the package manager. You should follow an online
guide to install node and npm. It shouldn't be
that hard.

`'npm i xxx'` is the command that installs xxx
then there are other commands, like `'npm update'`
or `'npm uninstall'` or `'npm remove'` (these last
two have the same function).

If you add the switch `'-g'` when you install
something, it will install globally, but it is
not recommended, it’s better to install everything
in the directory of your repository so that when
you delete it you have nothing installed in your
main system. ONLY npm -the package manager- and
few other stuff have to be installed globally.

The npm manager works with the `'package.json'` file
that you have in the main folder of the repo:

```
    "@nuxtjs/auth": "^4.8.1",
...
    "bootstrap": "^4.1.3",
    "bootstrap-vue": "^2.0.0-rc.26",
...
```

all these are currently build dependencies,
but you can also separate them into build (the
ones you see) and for example dev-dependencies.

You can see in the same file the line:
`"devDependencies": {}`

in node there is a difference between coding to
test (dev) and setting up the environment for
"production" or "online": build means we're going
to go online and we do not need special
features like autoreload. It's like when a dress
has the marks with chalk or the needles, it's not
definitive and you need it like that because you
need to play with it a little bit when you
are measuring it or testing if it fits you.

When you wear it, instead, it's online :)

Did you install node and npm?
You are now ready to install the repo,
and gain level 2!

VUE AND NUXT
Basically nuxt makes SSR easier, it renders the
files both on server and on client side for
better performance. Vue, instead, is very nice as
lets you have DYNAMIC VARIABLES in your html code.
For example, you can have a "for" loop into a div,
and the div will automagically produce many divs
as many elements in the for loop. Imagine you have
a list of projects in a database, they will be
cycled by the for loop and rendered, with a simple
instruction in the html tag. Finally you can have
COMPONENTS, that are pieces of code that you refer
to with a simple tag, for example to insert the
"banner" code into any of your pages, you would
just enter <banner /> in your html and.. ta-daan,
there it is.

For more info, please ask!

CSS
We use bootstrap + a single coo.css file.
Keep in mind, though, that Vue uses VueBootrap,
an ad-hoc version of Bootstrap.

Nothing really complicated, but in case.. please ask! :)

INSTALLATION
To set the repo up, go to its directory (if you
downloaded a zip, extract it). Then run ‘npm i’,
it will install all the required files.

Copy the `'dumbenv'` file from the `'/etc'` folder to the root of the project, rename it to `'.env'` and edit it according to its suggestions.

Then copy the `'image'` folder from the `'/etc'` folder to the `'/static/assets/'` folder of the project

Finally, to start the repo, run: ‘npm run dev‘:
it will run nuxt in development mode.

Errors:
If you get the error ETIMEDOUT check that HOST
is 127.0.0.1 or ‘localhost’.

If you get the error CONNECTION REFUSED it is
probable that MySQL is not running or that
your MySQL user and password aren't set
correctly.

There could be some other issues, so please
learn to ask in the discord server about
how to solve them.

If you see the colorful cooperacy circle
you've done it! Send a screenshot in the discord
server and celebrate!

You passed the level! In the contributors.md move
your line to the NUXTERS level!
