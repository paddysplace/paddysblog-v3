\-\-- layout: post title: Fire(out)Fox(ed) date:
\'2006-03-23T18:16:00.000Z\' author: Paddy tags: modified\_time:
\'2006-03-23T18:21:18.046Z\' blogger\_id:
tag:blogger.com,1999:blog-17598736.post-114313807802797314
blogger\_orig\_url:
https://paddeesplace.blogspot.com/2006/03/fireoutfoxed.html \-\-- Ok, I
know I shouldn\`t really laugh\...but\...\
\
\--\
A woman using the Firefox web browser discovered her fiancé's secret
life by accident. Here's a detailed account of what happened, and
instructions on how to reproduce the "bug." (from Bugzilla)\
\
[This privacy flaw has caused my fiancé and I to break-up after having
dated for 5 years.\
\
Basically, we share one computer but under separate Windows XP user
accounts. We both use Mozilla Firefox --- well, he used to use it more
than I do but now we don't really use it. The privacy flaw is this: when
he went to log-in under his dating sites (jdate.com, swinglifestyle.com,
adultfriendfinder.com, etc.), Mozilla promptly asks whether or not he'd
like Firefox to save the passwords for him. He chose never, obviously.
However, when he logged off his user account, and I logged onto my
Windows XP account X amount of days later, I decided to use Firefox
because hey --- it loaded everything much more efficiently, was better
to work on with website designs and is a lot more stable than IE7beta2.\
\
Firefox prompted whether or not I'd like it to save my password for
logging into my website. I chose never and changed my mind. I went into
the Password Manager to change the saved password option from Never to
Always and that's when I saw all these other sites that had been
selected as "Never Save Password." Of course, those were sites I had
never visited or could ever dream of visiting.\
\
Then I realized who, how and what... and sh\*t hit the fan. Your browser
does not efficiently respect the privacy of different users for one
system.\
]{style="font-style:italic;"}\
Reproducible: Always\
\
Steps to Reproduce:\
\
1. Create 2 unique user accounts (for steps sake, let's call the two
accounts Joe and Mary) in Windows XP Home.\
2. Logout and sign-in under Joe.\
3. Open Firefox and go to an e-mail site or to jdate.com or wherever.\
4. Attempt to log-in to the site so that Firefox will ask whether or not
you want your password saved.\
5. Choose not to save the password.\
6. After successfully logging in and having selected the "never save
password" option, logout.\
7. Log-in as Mary and open Firefox.\
8. Browse, browse, browse... but you don't really have to. Just go to
"View Saved Passwords," click on the tab that will show you sites to
never save passwords for, and you'll see whatever painful site Joe
denied to save a password for.\
9. Break-up with fiancé.
