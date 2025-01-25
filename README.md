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
     - ssh -i "DevTinder-secret.pem" ubuntu@ec2-3-110-108-80.ap-south-1.compute.amazonaws.com
   * Deployment
        - install node.js on server (same version as local)
        - clone repository from github
        - Frontend
            - npm install
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

        - Backend
            - npm install
            - allow ip in database
            - npm run start => production build
            - npm install pm2 -g => keep server active 24/7
            - pm2 start npm -- start => start the server
            - pm2 log => log the status
            - pm2 list => list all processes run by pm2
            - pm2 flush
            - pm2 stop <processName>
            - pm2 delete <processName>
            - pm2 start npm --name "devTinder-backend" -- start  => custom name
            - sudo nano /etc/nginx/sites-available/default
                - location /api/ {
                    proxy_pass http://localhost:<your_backend_port>/;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }
            - proxy pass :port to /api/ using nginx
            - sudo systemctl restart nginx
            - modify frontend BASE_URL to "/api"
        - added .env file for both frontend and backend and added in .gitignore
        - sudo nano .env => create .env in aws server => added .env manually to the aws server
        - Backend deployed

    
# Sending custom email using amazon ses
   - Setup IAM
       - User => create user => user name => attach policies directly => AmazonSESFullAccess => create user
   - SES
       - 