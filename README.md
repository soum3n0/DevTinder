# DevTinder
   * Setup AWS EC2 instances
     - Launch instance
         - give name
         - select os (e.g. ubuntu)
         - create new key pair
         - launch instance
     - connect to the instance using SSH client
     - chmod 400 "DevTinder-secret.pem"
     - ssh -i "DevTinder-secret.pem" ubuntu@ec2-13-232-68-170.ap-south-1.compute.amazonaws.com
   * Deployment
        - install node.js on server (same version as local)
        - clone repository from github
        - npm install for frontend and backend for install dependencies
        - Frontend
            - npm run build => production build
            - nginx for host frontend
            - sudo apt update  => to update the system (optional) 
            - sudo apt install nginx
            - sudo systemctl start nginx
            - sudo systemctl enable nginx
            - sudo scp -r dist/* /var/www/html/ => copy code from dist(build files) to var/www/html/
            - enable port :80 on instance (because nginx runs on port :80)
                - instance => security => security group => inbound rules => edit inbound rules => add rule => port range : 80, set ip 0.0.0.0/0 for accessing anywhere from the internet. => save rules
            - Frontend deployed

