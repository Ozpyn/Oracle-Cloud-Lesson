
+ [Intro](#in-the-cloud)
+ [Details](#details)
+ [Create VM](#create-a-vm-instance)
+ [VM Connect](#connect-to-the-running-vm)
+ [Bot Stuff](#bot-stuff)
    + [JavaScript](#javascript)
    + [Python](#python)

# In the Cloud

Before getting started (before coming to the meeting) please ensure you have signed up for an oracle cloud account, *the setup takes a little bit to do and also for Oracle to verify details*.
https://www.oracle.com/cloud/free/

Be sure to also install a functional ssh software. MacOS and many linux versions support ssh via the terminal by default. Windows PowerShell (not cmd.exe to my knowledge) also natively supports ssh. There are a variety of chrome extentions for chromebooks that add ssh functionality.

If using PuTTY, PuTTY KeyGen is also needed to convert ssh keys into putty keys.

---
`Take note: a credit card is required for making an account. Although if you stay within the constraints of the "always free tier" the card will not be charged.`

`If you wish to be extra careful to not be charged, I reccomend using privacy.com, they allow you to make a temporary card, which can be turned off after making an oracle account.` https://privacy.com/

## Details

In efforts to get more cusomers using their new infrastructure (using Ampere Arm), Oracle (the java people) made their free tier a fair bit more powerful. Usable processing power includes 4 cpu cores and 24 gb of ram. The resources can be split into multiple instances or pooled into just one.

With such a compuing instance somebody could (for example): Host a website, Host a Minecraft Server, Have a remote VSCode Development Server (Similar to Kent's CS wasp and hornet), make a RESTful API, Host a Discord Bot, and many others.

The most common way to host a website on a server involves a lengthy process of messing around with Apache2 or with bundles that include Apache2. This obviously is not the only website hosting tool, however it does seem to be the only beginner friendly one that I have found.

For the purposes of this lesson I suggest only allocating 2 cores and 8gb of ram to the Minecraft Server instance. (Oracle has support for changing the allocation of resources later on, if desired.)

## Create a VM Instance

First, we need to create a VM instance. To get started, click on 'Create a VM Instance' on the landing page after signing in. You may have to scroll down to the 'Launch Resources' panel.

![Create VM Instance.](/images/launch-resources.png "VM Instance")

Give your VM instance a name (I called mine “hacksu-lesson"). You can just leave the default (“root”) compartment selected. You can also leave the "availability domain" as the default.

![Name-Placement.](/images/compute.png "VM Name")

### Image and Shape

Next up, Image and Shape. Make sure you have the "Oracle Linux" image selected. Now on to the shape, this is where you allocate resources to your instance. Select "Ampere" as the desired shape series. As referenced earlier, I reccomend using 2 cores and 8gb of ram. If you attempt to use more resources than are available to you Oracle Cloud will warn you that you have exceeded your service limit.

![Image and Shape.](/images/image-shape.png "Image and Shape")

![Shape.](/images/shape-specify.png "Shape Specify")

Okay now that we've defined computing variables, verify that your shape variable contains the "always free-eligible" tag.

![Verify.](/images/always-free-verify.png "Verify")

### Networking

We’ll need to choose a virtual cloud network (VCN). Select ‘Create a new virtual cloud network’. Then, choose ‘Create a public subnet’ and choose names that are descriptive (You will thank yourself later, for the most part the names cannot change). Finally, make sure that ‘Assign a public IPv4 address’ is selected (required to make a connection via ssh).

![Networking.](/images/networking.png "Networking")

### SSH

Generate new ssh keys for a safe connection to your server. I would not reccomend using the 'No SSH keys' options.

![SSH-Keys.](/images/ssh-keys.png "SSH-Keys")

Save your keys in a safe place and make a backup in another safe place. (The keys are very difficult to remake)

---

Now, after all of those shenanegans you can click create on your vm.

![Create.](/images/create.png "Create")

After clicking create, you will be redirected to the VM details page, wait to continue until it is done provisioning.

## Connect to the Running VM

After the VM has provisioned its public ip-address and username will become visible. Be sure to take note and save these in a safe place.

![General Info.](/images/gen-info.png "General Info")

Using your preferred SSH client: connect to the server with the provided username and ip address. (e.g. `ssh usr@10.10.10.10 -i ~/Downloads/key.key` )

## Bot Stuff

There are two routes we can take from here, depending on the bot you have or want to build. Personally I prefer JavaScript, so that is the guild I will follow, however if you wish to host the Python bot you made in a previous lesson there will be instructions on how to do that here.

### JavaScript

### Python