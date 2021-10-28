function convertToCSV(objArray, tableHeaderName, headers) {
	const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
	let str = '';
	if (tableHeaderName !== '') {
		const tbleHdrNameArr = [];
		const tblHdrNamePosition = (Math.ceil(Object.keys(headers).length / 2) - 1);
		for (let i = 0; i < Object.keys(headers).length; i++) {
			if (i === tblHdrNamePosition) {
				tbleHdrNameArr.push(tableHeaderName);
			} else {
				tbleHdrNameArr.push(',');
			}
		}
		const tableName = `${tbleHdrNameArr.join()}\r\n`;
		str += tableName;
	}

	for (let i = 0; i < array.length; i++) {
		let line = '';
		for (const index in array[i]) {
			if (line != '') line += ',';

			line += array[i][index];
		}
		str += `${line}\r\n`;
	}
	return str;
}

function exportCSVFile(headers, items, fileTitle, tableHeaderName) {
	function addFooters() {
		const pageCount = doc.internal.getNumberOfPages();
		for(var i = 0; i < pageCount; i++) { }
	}
	
	var asset_dt = new Date();
	let day = asset_dt.getDate()
	// console.log('day '+day)
	let month = asset_dt.toLocaleString('default', { month: 'long' })
	// console.log('month '+month)
	let year = asset_dt.getFullYear()
	// console.log('year '+year)
	let hh = asset_dt.getHours()
	let ampm='AM'
	if(hh>12){
		hh=hh-12
		ampm='PM'
	}
	// console.log('hh '+hh)
	let mm = asset_dt.getMinutes()
	// console.log('mm '+mm)
	let ss = asset_dt.getSeconds()
	let download_date=day+" "+month+" "+year
	let download_time=hh+": "+mm+" "+ampm
	let downloaded_on = download_date+" "+download_time
	let footerText = "Copyright © "+asset_dt.getFullYear()+" Apple Inc. All rights reserved.";
	let publishText = "published by lexico";
	var asset_name=fileTitle;
	let lexico_header = asset_name.split('.')[1];
	let lexico_sub_header = 'asset details';
	let lexico_asset_type=''
	let hive_db=''
	//let versionStr = ((tableHeaderName.split('(')[1]).split(')')[0].toLowerCase().trim())
	//let version = 'v'.toLowerCase()+parseInt(versionStr.match(/[0-9]+/)[0], 10);
	let versionStr = (tableHeaderName);
	let version = 'v'+parseInt(versionStr);
	var doc = new window.jsPDF('p', 'pt', 'a4');
	var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
	doc.setDrawColor(0);
	doc.setFillColor(237, 248, 248);
	doc.roundedRect(20, 20, (pageWidth-40), (pageHeight-40), 2,2)
	doc.setTextColor(0, 0, 0);
	// doc.setFont("courier");
	doc.setFont('Helvetica');
	doc.setFontSize(25);
	doc.text(`${lexico_header}`, pageWidth / 2, (pageHeight*0.40), 'center');
	doc.setFontSize(10);
	doc.text(`${lexico_sub_header}`, pageWidth / 2, (pageHeight*0.43), 'center');
	if(asset_name.split('/').length>1){
		lexico_asset_type='Another Lexico Entity'
	}else{
		lexico_asset_type='hive table'
	}
	let hive_entity = asset_name.split('.')[1];

	// doc.setFontSize(10);
	hive_db = asset_name.split('.')[0];
	
	doc.setFontSize(8);
	var columns = [
		{ title: "", dataKey: "A" },
		{ title: "", dataKey: "B" }
			];
	
		var rows1 = [
			// { A: "name", B: `${hive_entity}`},
			{ A: "Type of Asset", B: `${lexico_asset_type}`},
			{ A: "Database", B: `${hive_db}`},
			{ A: "Schema Version", B: `${version}`},
			{ A: "Download on", B: `${downloaded_on}`}
		];
		doc.autoTable(columns, rows1, {
			styles: {
				font: 'Helvetica',
				lineColor:[70,70,70],
				lineWidth: 0.5,
				columnWidth: 128,
				fillColor:[237, 248, 248]
			},
			headerStyles: {
				fillColor: [255,255,255],
				halign: 'center',
				valign: 'middle'
			},bodyStyles: {
				fillColor: [237, 248, 248],
			},
			startY: (pageHeight*0.44) ,
			theme: 'grid',
			// bodyStyles: {lineColor: [0, 0, 0]},
			margin:{
				left: 185,
				right:178
			},
			// margin: { horizontal: (pageWidth/ 2) - (doc.getStringUnitWidth(`${rows1}`) * doc.internal.getFontSize() / 2)},
			bodyStyles: { valign: 'top' },
			styles: { overflow: 'linebreak', columnWidth: 'wrap' },
			columnStyles: 
			{ 
				1: 
				{ 
				fontSize: '4',
				columnWidth: 'auto'
				} 
			}
			
		});
	doc.addPage('p', 'pt', 'a4');
	doc.setFillColor(237, 248, 248);
	doc.setFont("courier");
	doc.setTextColor(0, 0, 0);
	doc.setFontSize(8);
	var col = ["#","Column","Type","Comment"];
	var rows = [];
	items.forEach(function(items, i){
		var temp = [(i+1),items.columnName,items.columnType,items.comments && items.comments.map((subComments, subId)=>subComments.comment)];
		rows.push(temp);
	});
	doc.autoTable(col, rows, {
		styles: {
			fontSize: '{8}', // I think this needs to be dynamic
			cellWidth: 'wrap'
			},
			headerStyles: {
				textColor:[0,0,0],
				fillColor: [242, 242, 242],
				halign: 'center',
				valign: 'middle'
			},
			bodyStyles: {
				textColor: [0,0,0],
			},
		startY: (pageHeight*0.10) ,
		theme: 'grid',
		margin: { horizontal: 25 },
		bodyStyles: { valign: 'top' },
		styles: { overflow: 'linebreak', columnWidth: 'wrap' },
		columnStyles: 
		{ 
			3: 
			{ 
			fontSize: '6',
			columnWidth: 'auto'
			} 
		}
	});
	doc.setTextColor(216, 216, 192);
	doc.setFontSize(8);
	doc.text(footerText, pageWidth*0.85, pageHeight  - 10, 'center');
	addFooters()
	let pdf_nm = lexico_header+"_"+hive_db+"_"+version+"_"+day+"_"+month+"_"+year
	doc.save(`${pdf_nm}.pdf`);
	return items;
}

function createCSV(csv, fileTitle) { }

export { exportCSVFile, convertToCSV, createCSV };
