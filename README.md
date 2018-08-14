# SolarWeb

Demo: https://fez994.github.io/SolarWeb/

Description: Solar Web is a personal project of mine. The goal of this site is to provide the user with a forecast for the energy production of their photovoltaic system. The website does this by taking the address (Of where the photovoltaic system is installed) and turn it into lat and lon coordinates (using google geocoding API) , then we use those coordinates to request the data regarding solar radiation. 


If we know the type of panel that the user is using ( ex mono crystalline silicon) we instatly know the performance (in percentage). 


At this point we know 
- The performace of the panel
- The radiation value (in w/m^2) 

We can easly use the formula 


n = EEL / I 


Where : 

n = performace of the panel


EEL= the energy output of our solar panel


I = the radiation (Direct + diffuse) 



If we turn the formula around we get: 

EEL = n * I 


By doing so we can provide the user an estimation of the energy production (in W ). I say "estimation" because there are different factors 
that can influence the prevision. Ex: dirty solar panels, temperature (for every 1°c above 25 ° C the output decrease by 0.something , 
depending on the brand of the solar panel), direct damage of the panel etc.  

One last note: i used the Solcast API to get the solar radiation data, at the moment (August 2018) the API is free to use because is still in development, 
but there is an high chance that it will turn into a pay API in the future, 
and therefore the project will no longer work. 



