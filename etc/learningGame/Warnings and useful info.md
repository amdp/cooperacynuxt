THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)

## LAST INFORMATION: A FEW WARNINGS

### WARNINGS

1. You cannot use `console.log(' '+JSON.stringify());`
with req.body, process.env, and some other objects, but
you can send to console their internal elements 
e.g. `console.log(' '+JSON.stringify(req.body.user));` .
When you use FormData() remember you
cannot console.log it. To log it, use:

```
for (var key of formData.entries()) {
  console.log(key[0] + ', ' + key[1])
}
```

2. Remember you cannot use fetch and
asyncData (nuxt functions) in components

3. Remember `let`, `var` and `const` are
different, so use them properly

4. Inserting dynamic images in nuxt is
more difficult than the standard vue 
because of babel, webpack and the nuxt
structure. So you would need to use a
computed: property or a methods: function.
Computed: are values like those in the data
function with the difference that they 
can be elaborated before
showing the page. 
Usually the `<img` tag is followed by
a dynamic source: ` :src=" ` that has
a function like `:src="getImage"`. Then,
script side, you have something like:

```
  computed: {
    getImage(){return require('../assets/image/'
    + project.image + '.png')},
    ...
  }
```

5. If you get an ERROR, remember to check 
the HTTP status error list:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

IF SOMETHING GOES WRONG, REMEMBER TO ASK!
THANK YOU FOR PARTICIPATING AND.. HELP US IMPROVE THIS LEARNING GAME!
FOR ALL THE REST, ENJOY LIFE AND HAVE FUN!
