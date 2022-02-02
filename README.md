
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository    "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && sudo apt-get update &&   sudo apt-get install docker-ce docker-ce-cli containerd.io && sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose
sudo adduser sber-ci

95cy7TnR64GhfnVYTp8MM6s8XwLaG9Pg
sudo usermod -aG docker sber-ci && sudo systemctl enable containerd.service && sudo systemctl enable docker.service

sudo mkdir /var/www && sudo mkdir /var/www/sber-cu-api && sudo chown -R sber-ci /var/www/sber-cu-api

sudo nano /etc/fstab
192.168.199.100:/opencast	/mnt/nfs/opencast	nfs	defaults	0	0
192.168.199.100:file-storage	/mnt/nfs/file-storage	nfs	user,rw	0	0
ls /mnt/nfs/
sudo mkdir /mnt/nfs/opencast && sudo mkdir /mnt/nfs/file-storage
sudo mount -a
8iUHon0*j#8*

sudo -i
su sber-ci

mkdir .ssh
nano .ssh/authorized_keys
Insert into .ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCj8idHDEhV5Q1wyp+kspBANEDnX/jHx6bz8xvNcRlRZg7ehrBPZ6FIWunaprL7+411+yQiw9uWMGwoNEXbpZCjgr6W8H741Tu7Ca8RnBq4VDs8TizJSGzLQ/DFm7h71xLkNlLHtKP+gmvQx1TAPrGlvR1Otj7OfFLLBjA2co2+rcrjxyx5OczNvVzGaCfGQK9el9AUG3/EJUOloJhUCZpk3HV1bileaxhG14Ywlvz773Y078KS6olKzEh4xGJB+lp2koMcNzEPn6QqRgeVvLgiJJ9xsPpC6mrlOTz8xlimsaeTowHPOB6evCiYh/9GMfxdEVmkN9tAP7wRV5OhmW4Z admin@dev