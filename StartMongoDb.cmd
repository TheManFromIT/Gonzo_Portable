@echo off
mkdir data
cd data
set DATA_FOLDER=%CD%
"C:\Program Files\MongoDB\Server\3.4\bin\mongod" --dbpath %DATA_FOLDER%