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

h