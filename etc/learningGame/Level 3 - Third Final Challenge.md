# THE COOPERACY CODERS LEARNING GAME

![Image](/assets/image/github/image3.png)


### FINAL CHALLENGE LEVEL THREE: VUE COMPONENTS AND A NEW COOPERACY PROJECT

Very well!! The rest of Vue you must learn should
be learnt by doing. We just need one final step:
components. At the same time, in Cooperacy we have 
some projects in the home page that are general,
while you can see, if you log in, YOUR created 
and archived projects. 
So let's create our first Cooperacy
project. Login and click on "add a new project" 
link.


Enter whatever you like, and then when you get
a confirmation go back to your profile clicking
on the image close to your name in the header.


You see your project there, right?
Well, now just for the sake of an experiment,
let's add the homepage logo into your user
page. How?
Just adding one component.


Let's start having a look at the component folder.
We will add the `home.vue` component.
Go to the user.vue page. Add after:

`<projectlist />`

the component:

`<home />`

but not after the closing `</div></template>`.


Now go to the script part and add after:

`import projectlist from '@/components/projectlist'`

the line

`import home from '@/components/home'`


what else? As a final step, edit the
component line:

```
components: { projectlist: projectlist, },
```

into:

```
 components: { 
  projectlist: projectlist, 
  home: home,
 },
```

now save and reload your user page if it didn't
automagically as usually nuxt does.
Scroll down and you should see the Cooperacy
logo animation.

Screenshot it and you will demonstrate to the
discord channel you learned that for inserting a
vue component you need to add the component tag,
import the document before the `export default`
line and finally to add it to the `components:`
line. Now you can even help the others
in the lower level with their 
difficulties, you gained the APPRENTICE level!
Edit the contributors.md and put your
name in the right position!

You also demonstrated you passed the final 
challenge before starting to develop!!
Continue and get ready for the final step!
