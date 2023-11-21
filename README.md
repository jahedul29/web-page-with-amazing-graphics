## Live

[tert](sdfdf)

### How to run the application

1. Clone the application from git

   ```
   git clone https://github.com/jahedul29/web-page-with-amazing-graphics
   ```

2. Install the dependencies
   nodejs version 18 recommended
   `   npm install`
   or
   `    yarn`
3. run the server
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

How it's work:

1. if solar parameter is high (>4), in the upper position showing the Sun, when solar is medium (>1) showing the sun behind a cloud, when the solar is very low (<=1>) or zero show only the cloud.
2. If the home value is greater than 3, it's showing red home. When the home value is less or equal to 3, it's showing a green home.
3. When batt_perc is greater than 19%, it's showing a green battery. When the batt_perc is less than 19%, it's showing a red battery.
4. Here is an arrow sign beside the battery that showing downward direction when batt > 0 and when batt is less or equal to 0 it's showing upward direction
5. When the grid value in greater than -4 and less than 8 it showing a blue grid. Otherwise it showing a red grid.
6. If the grid value is negative an arrow showing pointing towards the grid. Otherwise showing an arrow pointing outside of the grid.
7. if powerwall_connection_status is 0, it showing a red cross on the Web Page graphics and a big text “DATA NON AVAILABLE” is shwoing.
8. Date and time showing on the top of the webpage.
9. The webpage is getting refreshed every 7 seconds.
