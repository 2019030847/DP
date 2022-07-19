-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DP1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DP1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DP1` DEFAULT CHARACTER SET utf8 ;
USE `DP1` ;

-- -----------------------------------------------------
-- Table `DP1`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DP1`.`addresses` (
  `id_` INT NOT NULL,
  `Calle` VARCHAR(45) NOT NULL,
  `Num_Casa` INT(6) NOT NULL,
  `Colonia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DP1`.`persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DP1`.`persons` (
  `id_` INT NOT NULL,
  `Nombre1` VARCHAR(45) NOT NULL,
  `Nombre2` VARCHAR(45) NOT NULL,
  `Apellido_P` VARCHAR(45) NOT NULL,
  `Apellido_M` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DP1`.`phone_numers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DP1`.`phone_numers` (
  `id_` INT NOT NULL,
  `Numero1` INT(11) NOT NULL,
  `Numero2` INT(11) NOT NULL,
  PRIMARY KEY (`id_`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DP1`.`distributors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DP1`.`distributors` (
  `id_` INT NOT NULL,
  `Fecha_R` DATE NOT NULL,
  `persons_id` INT NOT NULL,
  `addresses_id` INT NOT NULL,
  `phone_numers_id` INT NOT NULL,
  PRIMARY KEY (`id_`),
  INDEX `fk_distributors_persons_idx` (`persons_id` ASC) VISIBLE,
  INDEX `fk_distributors_addresses_idx` (`addresses_id` ASC) VISIBLE,
  INDEX `fk_distributors_phone_numers_idx` (`phone_numers_id` ASC) VISIBLE,
  CONSTRAINT `fk_distributors_persons`
    FOREIGN KEY (`persons_id`)
    REFERENCES `DP1`.`persons` (`id_`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_distributors_addresses`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `DP1`.`addresses` (`id_`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_distributors_phone_numers`
    FOREIGN KEY (`phone_numers_id`)
    REFERENCES `DP1`.`phone_numers` (`id_`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '	';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
