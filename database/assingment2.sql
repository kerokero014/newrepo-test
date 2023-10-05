INSERT INTO public.account ( account_firstname, account_lastname, account_password )
VALUES ( 'Tony',
         'Stark',
         'tony@starkent.com',
         'Iam1ronman' );


UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark'

DELETE
FROM public.account WHERE account_firstname = 'Tony'
AND account_lastname = 'Stark';


UPDATE public.inventory
SET inv_description = 'huge interiors'
WHERE inv_make = 'GM';

UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'huge interior')
WHERE inv_make = 'GM';

SELECT inventory.inv_make, inventory.inv_model, classification.classification_name AS classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

UPDATE public.inventory
SET 
	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
