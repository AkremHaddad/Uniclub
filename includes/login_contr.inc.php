<?php

declare(strict_types=1);


function is_input_empty(string $email, string $pwd): bool {
  if (empty($email) || empty($pwd)){
    return true;
  } else {
    return false;
  }
}

function is_email_wrong(bool|array $result){
  if(!$result){
    return true;
  }else {
    return false;
  }
} 

function is_password_wrong(string $password, string $hashed_password){
  if(!password_verify($password, $hashed_password)){
    return true;
  }else {
    return false;
  }
} 