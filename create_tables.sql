
-- John Williams and Gregory Vandelune
-- CS340 db creation and seeding



-- Drop statements clean old db records if they exist.


DROP TABLE IF EXISTS `trail`;
DROP TABLE IF EXISTS `contact`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `location`;


DROP TABLE IF EXISTS `trail_location`;
DROP TABLE IF EXISTS `trail_reviews`;
DROP TABLE IF EXISTS `user_reviews`;
DROP TABLE IF EXISTS `trail_contacts`;

-- trail

CREATE TABLE `trail` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `trailName` VARCHAR(100) NOT NULL,
   `distance` DECIMAL(3,2),
   `difficulty` VARCHAR(20),
   `elevationGain` INT(11),
   `dogFriendly` VARCHAR(7),
   `season` VARCHAR(100)
) ENGINE=innoDB;


-- contact

CREATE TABLE `contact` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `orgName` VARCHAR(100) NOT NULL,
   `orgAddress` VARCHAR(100) NOT NULL,
   `city` VARCHAR(50) NOT NULL,
   `state` VARCHAR(2) NOT NULL,
   `zipCode` VARCHAR(14) NOT NULL,
   `phoneNumber` VARCHAR(22),
   `websiteURL` VARCHAR(100)
) ENGINE=innoDB;



-- user

CREATE TABLE `user` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `userName` VARCHAR(50) NOT NULL UNIQUE,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(50) NOT NULL,
   `country` VARCHAR(2) DEFAULT 'US'
) ENGINE=innoDB;

-- review

CREATE TABLE `review` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `date` DATE,
   `comment` VARCHAR(1000) NOT NULL
) ENGINE=innoDB;


-- location


CREATE TABLE `location` (
   `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `region` VARCHAR(50),
   `nearestCity` VARCHAR(50)
) ENGINE=innoDB;


-- subsequent tables
-- Relationship Tables

-- trail_location
CREATE TABLE `trail_location` (
  `tid` int(11) NOT NULL,
  `lid` int(11) NOT NULL,
  PRIMARY KEY (`tid`, `lid`),
  FOREIGN KEY (`tid`) REFERENCES `trail` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`lid`) REFERENCES `location` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=innoDB;


-- trail_reviews
CREATE TABLE `trail_reviews` (
  `tid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`tid`, `rid`),
  FOREIGN KEY (`tid`) REFERENCES `trail` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`rid`) REFERENCES `review` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=innoDB;


-- user_reviews
CREATE TABLE `user_reviews` (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`uid`, `rid`),
  FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`rid`) REFERENCES `review` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=innoDB;


-- trail_contacts
CREATE TABLE `trail_contacts` (
  `tid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`tid`, `cid`),
  FOREIGN KEY (`tid`) REFERENCES `trail` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cid`) REFERENCES `contact` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=innoDB;



-- Seed db
-- Seed trail

INSERT INTO trail (trailName, distance, difficulty, elevationGain, dogFriendly, season)
VALUES ("Denny Creek", 6.0, "easy", 1345, "YES", "year round"),
       ("Little Si", 4.7, "moderate", 1300, "YES", "year round"),
       ("Rattlesnake Ledge", 4, "moderate", 1160, "YES", "year round"),
       ("Mount Si", 8.0, "difficult", 3150, "YES", "year round"),
       ("Mount Constitution", 6.7, "moderately difficult", 1490, "UNKNOWN", "year round");


-- Seed contact

INSERT INTO contact (orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL)
VALUES ("Washington Trails Association", "705 2nd Ave #300", "Seattle", "WA", 98104, "(206) 625-1367", "https://www.wta.org/"),
       ("Pacific Northwest Trail Association", "1851 Charles Jones Memorial Circle, Unit #4", "Sedro-Woolley", "WA", 98284, "(360) 854-9415", "https://www.pnt.org/");


-- Seed user

INSERT INTO user (userName, email, password, country)
VALUES ("Shmuel Shwartz", "sshwartz@hotmail.com", "password12345", "US"),
       ("UserA", "userA@gmail.com", "abc123", "CA"),
       ("George Costanza", "gcostanza@protonmail.com", "basco", "US"),
       ("Art Vandelay", "VandelayA@yahoo.com", "latex55", "CA"),
       ("Hubert Gaskins", "hubeyG@amazon.com", "password9999", "UK");


-- Seed review

INSERT INTO review (date, comment)
VALUES ("2018-04-21", "Very fun hike. Weather was great and my dog found a bone in the woods. Definitely will return!"),
       ("2017-09-20", "Cold and rainy but I remembered my poncho. Got some great exercise. Will have to try it in the summer."),
       ("2018-01-23", "Was too difficult and I did not pack enough snacks to keep my energy up."),
       ("2017-06-01", "Perfect hike. Was worth the sunburn."),
       ("2018-04-25", "Did not see any dogs on the trail, but plenty of people. This is a good time of the year to go.");


-- Seed location

INSERT INTO location (region, nearestCity)
VALUES ("Snoqualmie Pass", "Rockdale"),
       ("Western Washington", "North Bend"),
       ("Puget Sound", "Doe Bay"),
       ("Central Washington", "Yakima"),
       ("Eastern Washington", "Spokane"),
       ("Southern Washington", "Kennewick");



-- Seed relationship tables with sample data

-- trail_location
INSERT INTO trail_location (tid, lid) VALUES ( (SELECT id FROM trail WHERE trailName="Denny Creek"),
    (SELECT id FROM location WHERE region="Snoqualmie Pass"));
INSERT INTO trail_location (tid, lid) VALUES ( (SELECT id FROM trail WHERE trailName="Little Si"),
    (SELECT id FROM location WHERE region="Western Washington"));

-- trail_reviews
INSERT INTO trail_reviews (tid, rid) VALUES ( (SELECT id FROM trail WHERE trailName="Denny Creek"),
    (SELECT id FROM review WHERE date="2018-04-21"));
INSERT INTO trail_reviews (tid, rid) VALUES ( (SELECT id FROM trail WHERE trailName="Little Si"),
    (SELECT id FROM review WHERE date="2017-09-20"));

-- user_reviews
INSERT INTO user_reviews (uid, rid) VALUES ( (SELECT id FROM user WHERE userName="UserA"),
    (SELECT id FROM review WHERE date="2018-04-21"));
INSERT INTO user_reviews (uid, rid) VALUES ( (SELECT id FROM user WHERE userName="George Costanza"),
    (SELECT id FROM review WHERE date="2017-09-20"));

-- trail_contacts
INSERT INTO trail_contacts (tid, cid) VALUES ( (SELECT id FROM trail WHERE trailName="Denny Creek"),
    (SELECT id FROM contact WHERE orgName="Washington Trails Association"));
INSERT INTO trail_contacts (tid, cid) VALUES ( (SELECT id FROM trail WHERE trailName="Little Si"),
    (SELECT id FROM contact WHERE orgName="Pacific Northwest Trail Association"));
