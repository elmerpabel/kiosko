/*
 * SimpleStore Google Sheets Plugin
 * To use Google spreadsheet as your database, follow the steps below:
 * 1. Use the "DemoSpreadsheet.xlsx" as a starting point
 * 2. Create a new Google spreadsheet
 * 3. Set sharing permissions to either “Public” or set to “Anyone with link can view”
 * 4. Publish the sheet (File -> Publish to the web -> Publish)
 * 5. Add the spreadsheet ID to your 'config.js' ( spreadsheetID : "XXXXXXXXXXXXXXXXXXXXXXX" )
 */

simpleStore.plugins.google = (function() {

	var storeProducts = verifyProducts = [];

	function getSpreadsheetData(s, verify, callback) {

		verify = typeof verify !== 'undefined' ? verify : false;

		var hostname = "https://spreadsheets.google.com";
		var format = "json";
//		var spreadsheetURL = hostname + "/feeds/worksheets/" + s.spreadsheetID + "/public/full?alt=" + format;
		var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1E9eQBE4c8vGbT12Qg9AhAA2o4JcS4RjSGVWqZ5y6zWk/gviz/tq?tqx=out:json&gid=1840056159";
		var mainsheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/od6/public/values?alt=" + format;
		var settingsSheetName = "Settings";
		var productsSheetName = "Products";
		var sheetIDs = {};

/*		function getSheetInfo (url, callback) {
			// Need to do this because od6 is default Google Sheet ID
			$.getJSON(url)
				.done(function(data) {

					var sheets = data.feed.entry;

					$(sheets).each(function(i, sheet) {

						var title = sheet.title.$t;
						var id = sheet.id.$t;
						var sheetID = id.substr(id.lastIndexOf('/') + 1);

						if(title == settingsSheetName) {
							sheetIDs.settingsSheetID = sheetID;
						}
						if(title == productsSheetName) {
							sheetIDs.productsSheetID  = sheetID;
						}
					});
					callback(sheetIDs.settingsSheetID);
					loadProductData(sheetIDs.productsSheetID);
				});
		}
*/
		function getSheetInfo (url, callback) {
			// Need to do this because od6 is default Google Sheet ID
			//$.getJSON(url)
			//	.done(function(data) {

					//var sheets = ["Settings","Products"];

					//$(sheets).each(function(i, sheet) {

							sheetIDs.settingsSheetID = "Settings";

							sheetIDs.productsSheetID  = "Products";
						
					//});
					callback(sheetIDs.settingsSheetID);
					loadProductData(sheetIDs.productsSheetID);
			//	});
		}

/*		function loadSiteSettings (id, callback) {

			var settingsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;

			$.getJSON(settingsSheetURL)
				.done(function(data) {
					var data = data.feed.entry;
					var s = simpleStore.settings;

					if(data[0]) {

						var siteName = data[0].gsx$sitenametextorimagelink.$t;
						var columns = data[0].gsx$columns123.$t;

						if (siteName) {
							s.brand = siteName;
						}
						if (columns) {
							s.numColumns = columns;
						}

						simpleStore.setLayout(s);
					}
				});
		}
*/
		function loadSiteSettings (id, callback) {

			//var settingsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;
			var settingsSheetURL = "https://docs.google.com/spreadsheets/d/1E9eQBE4c8vGbT12Qg9AhAA2o4JcS4RjSGVWqZ5y6zWk/gviz/tq?tqx=out:json&gid=659966060";
			$.get(settingsSheetURL)
				.done(function(data) {
					const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
  					if (r && r.length == 2) {
  						const obj = JSON.parse(r[1]);
  						const table = obj.table;
  						const header = table.cols.map(({label}) => label);
  						const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));

					var s = simpleStore.settings;

					if(table) {

						var siteName = table.rows[0].c[0].v;//rows[0][0];
						var columns = table.rows[0].c[1].v;//rows[0][1];

						if (siteName) {
							s.brand = siteName;
						}
						if (columns) {
							s.numColumns = columns;
						}

						simpleStore.setLayout(s);
					}
					}
				});
		}
		
/*		function loadProductData (id) {

//			var productsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;
			var productsSheetURL = "https://docs.google.com/spreadsheets/d/1E9eQBE4c8vGbT12Qg9AhAA2o4JcS4RjSGVWqZ5y6zWk/gviz/tq?tqx=out:json&gid=1840056159";
			// Get Main Sheet Products data
			$.getJSON(productsSheetURL)
				.done(function(data) {

					var productsData = data.feed.entry;

					// Build products
					$(productsData).each(function(i) {

						var options = this.gsx$options.$t;
						var setOptions = function(options) {
							var productOptions = [];
							if(options) {
								var opts = options.split(";").filter(function(el) {return el.length != 0});
								$(opts).each(function(i, option) {
									var opt = option.trim().split(":"),
										key = opt[0],
										val = opt[1],
										optObj = {};

									optObj[key] = val;
									productOptions.push(optObj);
								});
							}
							return productOptions;
						};

						// Get product values
						var product = {
							name : this.gsx$name.$t,
							price : this.gsx$price.$t,
							description : this.gsx$description.$t,
							options : setOptions(options),
							image : this.gsx$image.$t
						};

						if (verify) {
							verifyProducts.push(product);
						} else {
							storeProducts.push(product);
						}
					});
					callback();
				})
				.fail(function(data){
					if (verify) {
						var errorMsg = 'There was an error validating your cart.';
					} else {
						var errorMsg = 'Error loading spreadsheet data. Make sure the spreadsheet ID is correct.';
					}
					setTimeout(function(){ simpleStore.renderError(s, errorMsg); }, 1000);
				});
		}
*/
		function loadProductData (id) {

//			var productsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + id + "/public/values?alt=" + format;
			var productsSheetURL = "https://docs.google.com/spreadsheets/d/1E9eQBE4c8vGbT12Qg9AhAA2o4JcS4RjSGVWqZ5y6zWk/gviz/tq?tqx=out:json&gid=1840056159";
			// Get Main Sheet Products data
			$.get(productsSheetURL)
				.done(function(data) {
					const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
  					if (r && r.length == 2) {
  						const obj = JSON.parse(r[1]);
  						const table = obj.table;
  						const header = table.cols.map(({label}) => label);
  						const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : ""));
					var productsData = rows;

					// Build products rows[i][0] Name value , rows[i][1] Price value, rows[i][2] options  
					$(productsData).each(function(i) {

						var options = this[2];
						var setOptions = function(options) {
							var productOptions = [];
							if(options) {
								var opts = options.split(";").filter(function(el) {return el.length != 0});
								$(opts).each(function(i, option) {
									var opt = option.trim().split(":"),
										key = opt[0],
										val = opt[1],
										optObj = {};

									optObj[key] = val;
									productOptions.push(optObj);
								});
							}
							return productOptions;
						};

						// Get product values
						var product = {
							name : this[0],
							price : this[1],
							description : this[3],
							options : setOptions(options),
							image : this[4]
						};

						if (verify) {
							verifyProducts.push(product);
						} else {
							storeProducts.push(product);
						}
					});
				}
					callback();
				})
				.fail(function(data){
					if (verify) {
						var errorMsg = 'There was an error validating your cart.';
					} else {
						var errorMsg = 'Error loading spreadsheet data. Make sure the spreadsheet ID is correct.';
					}
					setTimeout(function(){ simpleStore.renderError(s, errorMsg); }, 1000);
				});
		}
		// Get Sheet data
		getSheetInfo(spreadsheetURL, loadSiteSettings);

	}

	function validatePrices(s, checkoutData) {
		verifyProducts = [];

		getSpreadsheetData(s, true, function() {
			if(simpleStore.verifyCheckoutData(checkoutData, verifyProducts, true)) {
        		simpleStore.checkout(s, checkoutData);
			} else {
				var errorMsg = 'There was an error validating your cart.';
				simpleStore.renderError(s, errorMsg);
			}
		});
	}

	return {
		init: function(callback) {
			var s = simpleStore.settings;

			// Clears out brand to allow for spreadsheet site name
			s.brand = "";
			simpleStore.setLayout(s);

			getSpreadsheetData(s, false, function(){
				callback(storeProducts);
			});
		},
		validate: function(checkoutData) {
			validatePrices(simpleStore.settings, checkoutData);
		}
	};
})();
