# Minecraft in the Cloud

Before getting started (before coming to the meeting) please ensure you have signed up for an oracle cloud account, *the setup takes a little bit*.
https://www.oracle.com/cloud/free/

Be sure to also install a functional ssh software. MacOS and many linux versions support ssh via the terminal by default. Windows PowerShell (not cmd.exe to my knowledge) also natively supports ssh. There are a variety of chrome extentions for chromebooks that add ssh functionality.

If using PuTTY, PuTTY KeyGen is also needed to convert ssh keys into putty keys.

---
`Take note: a credit card is required for making an account. Although if you stay within the constraints of the "always free tier" the card will not be charged.`

`If you wish to be extra careful to not be charged, I reccomend using privacy.com, they allow you to make a temporary card, which can be turned off after making an oracle account.` https://privacy.com/

## Details

In efforts to get more cusomers using their new infrastructure (using Ampere Arm), Oracle (the java people) made their free tier a fair bit more powerful. Usable processing power includes 4 cpu cores and 24 gb of ram. The resources can be split into multiple instances or pooled into just one.

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

We’ll need to choose a virtual cloud network (VCN). Select ‘Create a new virtual cloud network’. Then, choose ‘Create a public subnet’ and choose names that are descriptive (You will thank yourself later, for the most part the names cannoot change). Finally, make sure that ‘Assign a public IPv4 address’ is selected (required to make a connection via ssh).

![Networking.](/images/networking.png "Networking")

### SSH

Generate new ssh keys for a safe connection to your server. I would not reccomend using the 'No SSH keys' options.

![SSH-Keys.](/images/ssh-keys.png "SSH-Keys")

Save your keys in a safe place and make a backup in another safe place. (The keys are very difficult to remake)

---

Now, after all of those shenanegans you can click create on your vm.

![Create.](/images/create.png "Create")

## Connect to the Running VM
