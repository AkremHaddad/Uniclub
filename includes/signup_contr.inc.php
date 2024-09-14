<?php

declare(strict_types=1);

function is_input_empty(string $email, string $pwd): bool {
  if (empty($email) || empty($pwd)){
    return true;
  } else {
    return false;
  }
}

function is_email_invalid(string $email): bool {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
    return true;
  } else {
    return false;
  }
}  

function is_email_taken(\PDO $pdo, string $email): bool {
  if (get_email($pdo, $email)) {
    return true;
  } else {
    return false; 
  }
}

function create_user(\PDO $pdo, string $email, string $pwd): void {
   set_user($pdo, $email, $pwd);
} 