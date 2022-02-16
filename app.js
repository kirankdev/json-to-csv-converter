
let csvContent = "data:text/csv;charset=utf-8,";

function fillCSVHeader() {
    csvContent += 'Flow, Region, Name, Environment, SRCi V2 Lib.js download,	V2 Init(),	MA SDK download,	Visa SDK Load,	Amex SDK Load,	Discover SDK Load,	MA SDK Init,	Visa SDK Init,	Amex SDK Init,	Discover SDK Init,	MA SDK isRecognized(),	Visa SDK isRecognized(),	Amex SDK isRecognized(),	Discover SDK isRecognized(),	V2 getCards(),	MA SDK getSrcProfile(),	Visa SDK getSrcProfile(),	Amex SDK getSrcProfile(),	Discover SDK getSrcProfile(),	V2 Lookup(),	MA SDK idLookup() ,	Visa SDK idLookup(),	Amex SDK idLookup(),	Discover SDK idLookup()' + "\r\n";
}

function getloadTimesResponseTime(arr, key) {
    let value = '';
    if (arr && key) {
        var loadTime = Object.keys(arr).find(loadTime => loadTime.includes(key));
        if (loadTime) {
            let responseTime = arr[loadTime].responseTime;
            if (responseTime) {
                return responseTime;
            }
            else {
                return value;
            }
        }
        else {
            return value;
        }
    }
    else {
        return value;
    }
};

function srcSdksResponseTime(arr, keys) {
    let value = '';

    if (arr && keys) {
        let matchedSdk = arr.find(sdk => {
            let match = true;
            keys.forEach(key => {
                if (sdk.hasOwnProperty(Object.keys(key)[0]) && sdk[Object.keys(key)[0]] !== Object.values(key)[0]) {
                    match = false;
                }
            })
            return match;
        })

        if (matchedSdk) {
            return matchedSdk.responseTime;
        }
        return value;
    }
    return value;
}

function generateCSVString(arr) {
    arr.forEach(card => {
        var row = [];

        // Flow
        row.push(card.flowName ?? '');

        // Region
        row.push(card.region ?? '');

        // Name
        if (card.flowName === 'getCardsUnrecognizedNoCookie') {
            row.push((card.flowName ?? '').includes('NoCookie') ? 'no cookie' : '')
        }
        else if (card.flowName === 'getCardsRecognizedRequiresCookie') {
            row.push((card.flowName ?? '').includes('RequiresCookie') ? 'requires cookie' : '')
        }
        else if (card.flowName === 'idLookupRecognizedMa' || card.flowName === 'idLookupRecognizedVisa' || card.flowName === 'idLookupRecognizedDiscover') {
            row.push((card.flowName ?? '').includes('Recognized') ? 'Recognized' : '')
        }
        else if (card.flowName === 'idLookupUnrecognized') {
            row.push((card.flowName ?? '').includes('Unrecognized') ? 'Unrecognized' : '')
        }
        else{
            row.push('')
        }

        // Env
        row.push(card.environment ?? '')


        // SRCi V2 Lib.js download
        row.push(getloadTimesResponseTime(card.loadTimes, 'lib.js'));

        // V2 Init()
        if (card.methods && card.methods.init) {
            row.push(card.methods.init.responseTime ?? '');
        }

        //MA SDK download	
        row.push(getloadTimesResponseTime(card.loadTimes, 'srcsdk.mastercard.js'));

        //Visa SDK Load	
        row.push(getloadTimesResponseTime(card.loadTimes, 'visaSdk.js'));

        //Amex SDK Load
        row.push(getloadTimesResponseTime(card.loadTimes, 'amexSDK-1.0.0.js'));


        //Discover SDK Load
        row.push(getloadTimesResponseTime(card.loadTimes, 'dgnSS-SDK-1.1.2.js'));

        //MA SDK Init
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'mastercard' }, { "methodName": "init" }]));

        //Visa SDK Init,	
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'visa' }, { "methodName": "init" }]));

        //Amex SDK Init,
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'amex' }, { "methodName": "init" }]));

        //Discover SDK Init,
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'discover' }, { "methodName": "init" }]));


        //MA SDK isRecognized(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'mastercard' }, { "methodName": "isRecognized" }]));

        //Visa SDK isRecognized(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'visa' }, { "methodName": "isRecognized" }]));

        //Amex SDK isRecognized(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'amex' }, { "methodName": "isRecognized" }]));

        //Discover SDK isRecognized(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'discover' }, { "methodName": "isRecognized" }]));

        //V2 getCards(),
        if (card.methods && card.methods.getCards) {
            row.push(card.methods.getCards.responseTime ?? '');
        }

        //MA SDK getSrcProfile(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'mastercard' }, { "methodName": "getSrcProfile" }]));

        //Visa SDK getSrcProfile(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'visa' }, { "methodName": "getSrcProfile" }]));

        //Amex SDK getSrcProfile(),	
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'amex' }, { "methodName": "getSrcProfile" }]));

        //Discover SDK getSrcProfile(),
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'discover' }, { "methodName": "getSrcProfile" }]));


        //V2 Lookup(),	
        if (card.methods && card.methods.idLookup) {
            row.push(card.methods.idLookup.responseTime ?? '');
        }


        //MA SDK idLookup() Not recognized,	
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'mastercard' }, { "methodName": "identityLookup" }]));


        //Visa SDK idLookup() Not recognized,	
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'visa' }, { "methodName": "identityLookup" }]));


        //Amex SDK idLookup() Not recognized,
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'amex' }, { "methodName": "identityLookup" }]));


        //Discover SDK idLookup() Not recognized
        row.push(srcSdksResponseTime(card.srcSdks, [{ "networkId": 'discover' }, { "methodName": "identityLookup" }]));

        csvContent += row.join(',') + "\r\n";
    });
}

function readFiles(e) {
    const files = e.currentTarget.files;
    Object.keys(files).forEach(i => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(reader.result);
        }
        reader.readAsBinaryString(file);
    })
};

var filesJSONData = [];
function onChange(event) {
    Array.from(event.target.files).forEach(file => {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);
    })
}

function onReaderLoad(event) {
    try {
        filesJSONData.push(JSON.parse(event.target.result));
    }
    catch (e) {
        console.log('error in parsing file');
    }
}

document.getElementById('file-input').addEventListener('change', onChange);

document.getElementById('generate').addEventListener('click', () => {
    if (filesJSONData.length > 0) {
        document.getElementById('generating').style.display = "block";
        try {
            csvContent = "data:text/csv;charset=utf-8,";
            fillCSVHeader();

            filesJSONData.forEach(file => {
                if (file) {
                    generateCSVString(file)
                }
            });
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }
        finally {
            document.getElementById('generating').style.display = "none";
        }
    }
    else {
        alert('Select JSON files')
    }
});




