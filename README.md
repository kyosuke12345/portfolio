# ローカル環境での起動の仕方
1. docker-compose up
2. docker-compose exec backend sh  
   yarn install  
   yarn start:dev
3. docker-compose exec frontend sh  
   yarn install  
   yarn start:local  
