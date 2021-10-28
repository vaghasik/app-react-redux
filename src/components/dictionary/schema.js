export default{
  "datasetId": 6932,
  "datasetName": "default.bl_account_terms_events",
  "schemaDetails": [
    {
        "version": 1,
        "createdOn": "2019-10-01",
        "schemaInfo": [
            {
                "columnName": "event_time_epoch_millis",
                "columnType": "bigint",
                "comments": [
                    {
                        "comment": "Epoch time when the action has been performed by a user",
                        "version": 1
                    }
                ]
            },
            {
                "columnName": "eventtype",
                "columnType": "string",
                "comments": null
            },
            {
                "columnName": "device_family",
                "columnType": "string",
                "comments": [
                    {
                        "comment": "Device type of family of the device used buy User.\nEx: iPhone, iPad, Mac, iPod, pc etc",
                        "version": 1
                    }
                ]
            }
        ]
    }
],
"sample": [
    [
        {
            "colNm": "ireporter_id",
            "colVal": "2e27a95447a9091b7e09aad3914ebf8400"
        },
        {
            "colNm": "event_time_epoch_millis",
            "colVal": "1573545578249"
        },
        {
            "colNm": "date",
            "colVal": "2019-11-12"
        }
    ],
    [
        {
            "colNm": "ireporter_id",
            "colVal": "cae5670b57668ec2d3f9ee3618a3fded00"
        },
        {
            "colNm": "event_time_epoch_millis",
            "colVal": "1573585627953"
        },
        {
            "colNm": "date",
            "colVal": "2019-11-12"
        }
    ]
],
"viewDefinitions": null
}