
/*
Title: jQuery Plugin: Convert Table Column Numbers
Plugin Name: jQuery Table Convert Plugin
Github: https://github.com/mohitk117/jquery-table-convert-plugin
Author: Mohit Khanna
*/

(function( $ ) {
    var currencies = [{"currency":"dollar","symbol":"&#36;"},{"currency":"cent","symbol":"&#162;"},{"currency":"pound_sterling","symbol":"&#163;"},{"currency":"yen","symbol":"&#165;"},{"currency":"franc","symbol":"&#8355;"},{"currency":"lira","symbol":"&#8356;"},{"currency":"peseta","symbol":"&#8359;"},{"currency":"euro","symbol":"&#128;"},{"currency":"rupee","symbol":"&#x20B9;"},{"currency":"won","symbol":"&#8361;"},{"currency":"hryvnia","symbol":"&#8372;"},{"currency":"drachma","symbol":"&#8367;"},{"currency":"tugrik","symbol":"&#8366;"},{"currency":"german_penny","symbol":"&#8368;"},{"currency":"guarani","symbol":"&#8370;"},{"currency":"peso","symbol":"&#8369;"},{"currency":"austral","symbol":"&#8371;"},{"currency":"cedi","symbol":"&#8373;"},{"currency":"kip","symbol":"&#8365;"},{"currency":"new_sheqel","symbol":"&#8362;"},{"currency":"dong","symbol":"&#8363;"}];
    var conversionFormulas = [{"fromUnit":"feet","divisionUnits":[{"unit":"meter","formulaValue":"3.2808"},{"unit":"centimeter","formulaValue":"0.032808"},{"unit":"kilometer","formulaValue":"3280.8"}],"multiplyUnits":[{"unit":"inch","formulaValue":"12"},{"unit":"yard","formulaValue":"0.33333"},{"unit":"mile","formulaValue":"0.00018939"}]},{"fromUnit":"meter","divisionUnits":[{"unit":"centimeter","formulaValue":"0.01"},{"unit":"kilometer","formulaValue":"1000"}],"multiplyUnits":[{"unit":"feet","formulaValue":"3.2808"},{"unit":"inch","formulaValue":"39.370"},{"unit":"yard","formulaValue":"1.0936"},{"unit":"mile","formulaValue":"0.00062137"}]},{"fromUnit":"inch","divisionUnits":[{"unit":"meter","formulaValue":"39.370"},{"unit":"centimeter","formulaValue":"0.39370"},{"unit":"kilometer","formulaValue":"39370"}],"multiplyUnits":[{"unit":"feet","formulaValue":"0.083333"},{"unit":"yard","formulaValue":"0.027778"},{"unit":"mile","formulaValue":"0.000015783"}]},{"fromUnit":"centimeter","divisionUnits":[{"unit":"meter","formulaValue":"100"},{"unit":"kilometer","formulaValue":"100000"}],"multiplyUnits":[{"unit":"feet","formulaValue":"0.032808"},{"unit":"inch","formulaValue":"0.39370"},{"unit":"yard","formulaValue":"0.010936"},{"unit":"mile","formulaValue":"0.0000062137"}]},{"fromUnit":"yard","divisionUnits":[{"unit":"meter","formulaValue":"1.0936"},{"unit":"kilometer","formulaValue":"1093.6"},{"unit":"centimeter","formulaValue":"0.010936"}],"multiplyUnits":[{"unit":"feet","formulaValue":"3"},{"unit":"inch","formulaValue":"36"},{"unit":"mile","formulaValue":"0.00056818"}]},{"fromUnit":"kilometer","divisionUnits":[],"multiplyUnits":[{"unit":"meter","formulaValue":"1000"},{"unit":"centimeter","formulaValue":"100000"},{"unit":"yard","formulaValue":"1093.6"},{"unit":"feet","formulaValue":"3280.8"},{"unit":"inch","formulaValue":"39370"},{"unit":"mile","formulaValue":"0.62137"}]},{"fromUnit":"mile","divisionUnits":[{"unit":"meter","formulaValue":"0.00062137"},{"unit":"centimeter","formulaValue":"0.0000062137"},{"unit":"kilometer","formulaValue":"0.62137"}],"multiplyUnits":[{"unit":"feet","formulaValue":"5280"},{"unit":"inch","formulaValue":"63360"},{"unit":"yard","formulaValue":"1760"}]}];

    $.fn.convertNumber = function( action ) {
            var $tr = this.find("tbody tr");
            var argument = action.split(":");
            var actionToDo = argument[0];
            var columnNumber = (argument[1] - 1);
        if(actionToDo == "booleanToInteger"){
            $tr.each(function(i,row){
                var elementCell = $(row).find("td:eq(1)");
                var elementCellBoolean = elementCell.text() == 'false' ? 0:1;
                elementCell.text(elementCellBoolean);
            });
        }
        if ( actionToDo == "toPercent" ) {
            $tr.each(function(i,row){
                var elementCell = $(row).find("td:eq(1)");
                var elementCellValue = elementCell.text() + "&#37;";
                elementCell.html(elementCellValue);

            });
        }
        if ( actionToDo.indexOf("toDecimal-") > -1 ) {
            var optionValue = actionToDo.split("-")[1];
            $tr.each(function(i,row){
                var elementCell = $(row).find("td:eq(1)");
                var elementCellValue = parseFloat(elementCell.text()).toFixed(optionValue);
                elementCell.text(elementCellValue);

            });
        }
        if ( actionToDo.indexOf("lengthConvert-") > -1 ) {
            var optionValue = actionToDo.split("-")[1];
            var conversionKeys = optionValue.split("TO");
            var fromConvert = conversionFormulas.filter(unit => unit.fromUnit == conversionKeys[0]);
            
            var toConvertDivision = fromConvert[0].divisionUnits.filter(unit => unit['unit'] == conversionKeys[1]);
            var toConvertMultiply = fromConvert[0].multiplyUnits.filter(unit => unit['unit'] == conversionKeys[1]);
            $tr.each(function(i,row){
                var elementCell = $(row).find("td:eq(1)");
                var conversionValue = elementCell.text();
                var elementCellValue;// = toConvertDivision.length ? 
                if(toConvertDivision.length) elementCellValue = conversionValue/toConvertDivision[0].formulaValue;
                if(toConvertMultiply.length) elementCellValue = conversionValue * toConvertMultiply[0].formulaValue;
                else if(toConvertMultiply.length && toConvertDivision.length)elementCellValue = conversionValue;

                elementCell.text(elementCellValue);
            });
        }
        if ( actionToDo.indexOf("toCurrency-") > -1 ) {
            var optionValue = actionToDo.split("-")[1];
            $tr.each(function(i,row){
                var elementCell = $(row).find("td:eq(1)");
                var elementCellDefaultValue = elementCell.text();
                var elementCellValue = currencies.filter(currency => currency.currency == optionValue);
                elementCell.html(elementCellValue[0].symbol + elementCellDefaultValue);
            });

        }
        return this;
    };
 
}( jQuery ));