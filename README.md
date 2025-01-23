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
    - install node.js on server (same version as local)
    - clone repository from github
    
