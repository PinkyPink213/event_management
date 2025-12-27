terraform {
  backend "s3" {
    bucket         = "my-terraform-event-states"
    key            = "event/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
