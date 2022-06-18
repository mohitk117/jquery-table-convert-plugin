# jquery-table-convert-plugin
 <h1>jQuery Plugin: Convert Table Column Numbers</h1>
        <p class="lead">This plugin allows you to convert numbers a column in an html table. You can also chain the table with this plugin to resolve conversion methods.<br>
        Divide the argument of the jQuery function with ":" for the first being the conversion used, and the second indicating the column you need to convert.</p>
        <p>Examples:</p>
        
        
                $("table").convertNumber("toPercent:2");
                $("table").convertNumber("toDecimal-2:2");
                $("table").convertNumber("lengthConvert-meterTOcentimeter:2").convertNumber("toDecimal-2:2");
                $("table").convertNumber("toDecimal-2:2").convertNumber("toCurrency-dollar:2");


<table class="table table-bordered table-hover table-responsive table-striped table-dark">
            <thead><tr><th>Options</th><th>Option List</th></tr></thead>
            <tbody>
                <tr>
                    <td>
                    Unit Options
                    </td>
                    <td>
                        "kilometer", "meter", "centimeter", "yard", "feet", "inch", "mile"
                    </td>
                </tr>
                <tr>
                    <td>
                    Curency Options
                    </td>
                    <td>
                        "dollar", "cent", "pound_sterling", "yen", "franc", "lira", "peseta", "euro", "rupee", "won", "hryvnia", "drachma", "tugrik", "german_penny", "guarani", "peso", "austral", "cedi", "kip", "new_sheqel", "dong"
                    </td>
                </tr>
        </tbody>

