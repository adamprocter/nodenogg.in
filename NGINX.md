server {
listen 217.147.85.104:80;
server_name *.nodenogg.in;
root /var/www/vhosts/nodenogg.in/alpha.nodenogg.in;

location / {
try_files $uri $uri/ /index.html;
}

location /microcosm {
alias /var/www/vhosts/nodenogg.in/alpha.nodenogg.in;
try_files \$uri /microcosm/index.html;
}

}
