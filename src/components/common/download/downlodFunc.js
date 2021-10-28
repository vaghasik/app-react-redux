updateFields(response) {
  this.setState((state) => {
    state.schemaData.map((entityTblObj) => {
      const reqDataSets = response.schemaDetails[response.schemaDetails.length - 1].schemaInfo;
      reqDataSets.forEach((newDataSet) => {
        if (entityTblObj.columnName === newDataSet.columnName) {
          delete state.editedRecords[newDataSet.columnName];
          const collectionItem = entityTblObj;
          collectionItem.comments = newDataSet.comments;
          collectionItem.contentUpdated = false;
          collectionItem.isChecked = false;
          collectionItem.isEditButtonClicked = false;
          let commentValue = '';
          if (!collectionItem.comments || collectionItem.comments.length === 0) {
            // If the comments value is null OR comments is empty array
            commentValue = '';
          } else {
            commentValue = collectionItem.comments[collectionItem.comments.length - 1].comment;
          }
          const descValueColor = this.getColorValueFromDesc(commentValue);
          collectionItem.rowColor = descValueColor;
          collectionItem.modifiedDescription = commentValue;
        } else if (state.editedRecords[entityTblObj.columnName] && !state.editedRecords[entityTblObj.columnName].isChecked) {
          const collectionItem = entityTblObj;
          collectionItem.contentUpdated = false;
          collectionItem.isChecked = false;
          collectionItem.isEditButtonClicked = false;
          let commentValue = '';
          if (!collectionItem.comments || collectionItem.comments.length === 0) {
            // If the comments value is null OR comments is empty array
            commentValue = '';
          } else {
            commentValue = collectionItem.comments[collectionItem.comments.length - 1].comment;
          }
          const descValueColor = this.getColorValueFromDesc(commentValue);
          collectionItem.rowColor = descValueColor;
          collectionItem.modifiedDescription = commentValue;
        }
      });
    });

    state.entTblDtlsColNmSrchVal = '';
    state.entTblDtlsColDescSrchVal = '';
    state.editedRecords = {};
    state.showSavePopup = false;
    state.showDescFlag = false;
    state.descriptionText = null;
    state.descColumnName = '';

    return state;
  });
}
