-- DB Manipulation queries
-- John Williams
-- CS 340

-- Get info.
-- Get all trails on trail page to populate trail table and update-trail table
SELECT trailName, distance, difficulty, elevationGain, dogFriendly, season FROM trail;

-- Get all contacts on contacts page to populate contacts table and update-contacts table
SELECT orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL FROM contact;

-- Get all users on users page to populate users table and update-users table
SELECT userName, email, password, country FROM user;

-- Get all reviews on reviews page to populate reviews table
SELECT date, comment FROM review;

-- Get all locations on locations page to populate locations table
SELECT region, nearestCity FROM location;

-- Update data
-- Get a single trails data to populate the update trail form based on which update button you clicked on.
SELECT id, distance, difficulty, elevationGain, dogFriendly, season
FROM trail WHERE id = [trailID_selected_from_page]

-- Get a single contacts data to populate the update contacts form based on which update button you clicked on.
SELECT id, orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL
FROM contact WHERE id = [contactID_selected_from_page]

-- Get a single user data to populate the update user form, depending on which one they click on.
SELECT id, userName, email, password, country
FROM user WHERE id = [userID_selected_from_page]

-- Update a trail table row after submitting the form.
UPDATE trail SET trailName=[trailNameInput], distance=[distanceInput], difficulty=[difficultyInput],
elevationGain=[elevationGainInput], dogFriendly=[dogFriendlyInput], season=[seasonInput]
    WHERE trailName = [trailNameInput];

-- Update a contact table row after submitting the form.
UPDATE contact SET orgName=[orgNameInput], orgAddress=[orgAddressInput], city=[cityInput],
state=[stateInput], zipCode=[zipCodeInput], websiteURL=[websiteURLInput];
    WHERE orgName=[orgNameInput];

-- Update a user table row after submitting the form.
UPDATE user SET userName=[userNameInput], email=[emailInput], password=[passwordInput],
country=[countryInput];
    userName=[userNameInput];


-- Create new entities to the table
-- Create a trail data via the form to create after clicking 'create' button on page.
INSERT INTO trail (trailName, distance, difficulty, elevationGain, dogFriendly, season)
    VALUES ([trailNameInput], [distanceInput], [difficultyInput], [elevationGainInput], [dogFriendlyInput], [seasonInput])

-- Create a contact data
INSERT INTO contact (orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL)
    VALUES ([orgNameInput], [orgAddressInput], [cityInput], [stateInput], [zipCodeInput], [phoneNumberInput], [websiteURLInput])

-- Create a user data via the form to create after clicking 'create' button on page.
INSERT INTO user (userName, email, password, country)
    VALUES ([userNameInput], [emailInput], [passwordInput], [countryInput])

-- Create a review data via the form to create after clicking 'create' button on page.
INSERT INTO review (date, comment)
    VALUES ([dateInput], [commentInput];

-- Delete a value from a table when clicking delete button
-- Delete a trail
DELETE FROM trail WHERE id = [trailID_selected_from_page]

-- Delete a contact
DELETE FROM contact WHERE id = [contactID_selected_from_page]

-- Delete a user
DELETE FROM user WHERE id = [userID_selected_from_page]

-- Delete a review
DELETE FROM review WHERE id = [reviewID_selected_from_page

-- Locations cannot be deleted or created. They are hardcoded.


-- Relationship tables that associate entities together.
-- Add locations based on a trail name and the location region name.
INSERT INTO trail_location (tid, lid) VALUES ((SELECT id FROM trail WHERE trailName = [nameInput]),
    (SELECT id FROM location WHERE region=[regionInput] ) );

-- Add reviews based on a trail name and the review date.
INSERT INTO trail_reviews (tid, rid) VALUES ((SELECT id FROM trail WHERE trailName = [nameInput]),
    (SELECT id FROM review WHERE date=[dateInput] ) );

-- Add reviews based on a user name and the review date.
INSERT INTO user_reviews (uid, rid) VALUES ((SELECT id FROM user WHERE userName = [nameInput]),
    (SELECT id FROM review WHERE date=[dateInput] ) );

-- Add contacts based on a trail name and the contact org name.
INSERT INTO trail_location (tid, cid) VALUES ((SELECT id FROM trail WHERE trailName = [nameInput]),
    (SELECT id FROM contact WHERE orgName=[orgNameInput] ) );
