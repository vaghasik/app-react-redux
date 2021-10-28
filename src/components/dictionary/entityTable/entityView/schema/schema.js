import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faInfoCircle,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import * as TableAction from "../../../../../action/TableAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchInput from "../../../../common/searchBar/searchInput";
import { exportCSVFile, createCSV } from "../../../../common/download/download";
import DataError from "../../../../common/dataError/dataError";

import "./schema.scss";
import { connectAdvanced } from "react-redux";

const options = [
  { value: "G", label: "All tables" },
  { value: "A", label: "Application" },
  { value: "S", label: "Service" },
  { value: "L", label: "Local" }
];
class Schema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      searchFields: "Search fields",
      searchDiscription: "Search description",
      dataErrorMsg: "Schema Data not available",
      showSchemaCommentInfoModal: false,
      showVersionDetailModal: false,
      showEditCommentModal: false,
      showEditCommentTextarea: false,
      schemaCurrentUpdateComment: "",
      schemaDataIndex: null,
      showPreviewBtn: false,
      editedRecordId: [],
      editedDataObject: {},
      updatedCommentList: "",
      searchData: "",
      isAllSelected: false,
      isModifed: false,
      checkedComent: false,
      checkedComentsAll: false,
      columnName: "",
      commentsEditPl: "",
      propogationSelected: "",
      propogationSelectedValue: "",
      schemaCommentsObj: {},
      UpdatedCommentsList: [],
      selectedCommentObj: {},
      editedColumnType: "",
      listChecked: [],
      commentsChange: {},
      selectcomments: [],
      selectedComments: [],
      allDescriptionList: [],
      SelectedUpdatedCommentsList: [],
      beforeChangeList: [],
      allSchemaList:[],
      changeStatus:false,
      oldSchema:[]
    };
  }
/*   componentWillReceiveProps(nextProps) {
    if (nextProps.schemaData) {
      this.setState({ schemaData: nextProps.schemaData });
    }
  } */
  static getDerivedStateFromProps(nextProps, prevState) {
      console.log("Done",prevState.changeStatus)
      if (prevState.allDescriptionList !== nextProps.schemaData && !prevState.changeStatus) {
        console.log("ok")
        return { allDescriptionList: nextProps.schemaData && nextProps.schemaData[
          nextProps.schemaData.length - 1
        ] && nextProps.schemaData[
          nextProps.schemaData.length - 1
        ].schemaInfo ,allSchemaList:nextProps.schemaData};
      } else {
        return  null;
      }
    
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  // if (prevState.showPreviewBtn !== nextProps.showStatus) {
  // console.log("if",nextProps.showStatus)
  // return { showPreviewBtn: nextProps.showStatus};
  // }else{
  // return { showPreviewBtn: true};
  // }
  // }
  handleSearchInputChange = data => {
    this.setState({ searchData: data,changeStatus:false });
  };
  handleSearchCommentInputChange = data => {
    this.setState({ searchData: data });
  };
  versionDetailModalFunc() {
    this.setState({ showVersionDetailModal: true });
  }
  versionCommentInfoModalFunc(index) {
    const schemaFieldName = this.state.allDescriptionList[index].columnName;
    this.setState({
      schemaFieldName: schemaFieldName,
      showSchemaCommentInfoModal: true
    });
    let datasetName = this.props.entityId;
    let entitySrcId = this.props.entitySrcId;
    this.props.getSchemaComments(entitySrcId, datasetName, schemaFieldName); //for multiple coments API
  }
  closeEditCommentsModal() {
    this.setState({ showEditCommentModal: false });
  }
  closeCommentListInfoModal() {
    this.setState({ showSchemaCommentInfoModal: false });
  }
  closeVersiondetailsModal() {
    this.state.allSchemaList.reverse();
    this.setState({ showVersionDetailModal: false });
  }
  downLoadPdf = () => {
    exportCSVFile(
      "",
      this.state.allDescriptionList,
      this.props.entityTitle,
      this.state.allSchemaList[this.state.allSchemaList.length - 1].version
    );
  };
  downLoadPdf2 = () => {
    exportCSVFile(
      "",
      this.state.allDescriptionList,
      this.props.entityTitle,
      this.state.allSchemaList[this.state.allSchemaList.length - 2].version
    );
  };
  downLoadPdf3 = () => {
    exportCSVFile(
      "",
      this.state.allDescriptionList,
      this.props.entityTitle,
      this.state.allSchemaList[this.state.allSchemaList.length - 3].version
    );
  };
  editCommentFunc(index, editColumnName, comment) {
    //this.state.allSchemaList[this.state.allSchemaList.length - 1].schemaInfo[index].isEditButtonClicked = true;
    /*  const schemaCommentData = this.state.allSchemaList[
      this.state.allSchemaList.length - 1
    ].schemaInfo[index].comments
      ? this.state.allSchemaList[this.state.allSchemaList.length - 1].schemaInfo[
          index
        ].comments[
          this.state.allSchemaList[this.state.allSchemaList.length - 1].schemaInfo[
            index
          ].comments.length - 1
        ].comment
      : ""; */
    this.setState({
      // editedDataObject,
      schemaDataIndex: index,
      schemaCurrentUpdateComment: comment,
      showEditCommentTextarea: true,
      changeStatus:true
    });
  }

  handleCommentChange(id, columnName, columnType, PL, event) {
    //console.log('PL on Hnadle', PL);
    console.log("PL", this.state.allDescriptionList);
    console.log("oldData", this.props.Before);
    const updatedComment = [{ comment: event.target.value }];
    const editedRecordIds = this.state.allDescriptionList.map((item,index) =>
    index === id
      ? { ...item, columnName: item.columnName ? item.columnName : null,
        columnType: item.columnType ? item.columnType : null,
        PL: PL ? PL : null,
        comment: event.target.value,
        comments:updatedComment }
      : item
    );
     
     this.state.UpdatedCommentsList.push(editedRecordIds[id]);
     const uniques = Object.values(
      this.state.UpdatedCommentsList.reduce((a, c) => {
        a[c.columnName] = c;
        return a
      }, {}))
    console.log("sdasd",this.props.schemaData[
      this.props.schemaData.length - 1
    ].schemaInfo)
    this.setState(
      {
        commentsChange: {
          columnName,
          columnType,
          comment: event.target.value,
          PL: this.state.propogationSelectedValue[id]
        },
        UpdatedCommentsList: uniques,
        columnName: columnName,
        editedColumnType: columnType,
        commentsEditPl: PL,
        showPreviewBtn: true,
        isModifed: true,
        editedRecordId: editedRecordIds,
        allDescriptionList:editedRecordIds,
        changeStatus:true
      },
      () => {
        this.state.selectcomments.filter(a => a.columnName == columnName)
          .length > 0
          ? null
          : this.state.selectcomments.push(this.state.commentsChange);
        //  this.props.ShowPreview(false);
      }
    );
  }
  stopCommentEdit() {
    this.setState({ showEditCommentTextarea: false });
  }
  previewCommentEdits = () => {
    this.setState({ showEditCommentModal: true, oldSchema:this.props.schemaData[
      this.props.schemaData.length - 1
    ].schemaInfo });
  };

  handleCheckComment = (event, id, columnName) => {
    console.log("selected data", this.state.oldSchema);
    const target = event.target;
    const name = target.name;
    //const valueChecked = target.type === "checkbox" ? target.checked : target.value;
    let valueChecked = target.checked;

    this.setState(
      prevState => {
        let { UpdatedCommentsList, isAllSelected,changeStatus,oldSchema } = prevState;
        if (name === "selcetAllComment") {
          isAllSelected = valueChecked;
          UpdatedCommentsList = UpdatedCommentsList.map((item, index) => ({
            ...item,
            currentChecked: valueChecked
          }));
        } else {
         /*  if(valueChecked){
            oldSchema = oldSchema
          }else{

          } */
          UpdatedCommentsList = UpdatedCommentsList.map(item =>
            item.columnName === columnName
              ? { ...item, currentChecked: valueChecked }
              : item
          );
          isAllSelected = UpdatedCommentsList.every(
            item => item.currentChecked === true
          );
        }
        return { isAllSelected, UpdatedCommentsList,changeStatus:true };
      },
      () => {
        console.log(this.state.UpdatedCommentsList);
      }
    );
  };
  handleSelectPropogationChange(propogationSelected, id, columnName) {
    this.state.UpdatedCommentsList[id].PL =
      propogationSelected.label;
      this.state.allDescriptionList[id].PL =
      propogationSelected.label;
    this.setState({ ["propogationSelectedValue" + id]: propogationSelected,changeStatus:true });
    console.log(this.state.UpdatedCommentsList);
  }
  discardCommentChanges = () => {
    this.setState({
      UpdatedCommentsList: [],
      allDescriptionList:[],
      editedRecordId: [],
      oldSchema:[],
      showEditCommentModal: false,
      showPreviewBtn: false,
      isModifed: faBullseye,
      isAllSelected:false
    });
  };
  saveCommentChanges = () => {
    this.setState({
      showEditCommentModal: false,
      showPreviewBtn: false,
      //UpdatedCommentsList: [],
      editedRecordId: []
    });
    let checkValid = this.state.UpdatedCommentsList.filter(item=>item.currentChecked && item.PL);
    console.log("check",checkValid)
    var FinalArr = [...this.state.oldSchema, ...checkValid];
    const uniques = Object.values(
      FinalArr.reduce((a, c) => {
        a[c.columnName] = c;
        return a
      }, {}))
    let filteredData = uniques.map(item => {
      return {
        columnName: item.columnName ? item.columnName : null,
        columnType: item.columnType ? item.columnType : null,
        PL: item.PL ? item.PL : null,
        comment: item.comment ? item.comment : item.comments && item.comments.map(item=>item.comment).toString()
      };
    });
    console.log("got it",filteredData)
    this.setState(
      {
        allDescriptionList: filteredData,
        changeStatus:true
      },
      () => {
       this.props.postSchemaInfoDataAction(
          this.props.entityId,
          this.state.allDescriptionList
        ); 
      }
    );
  };

  render() {
    return (
      <div className="schema">
        {this.state.allSchemaList.length > 0 ? (
          <div className="schema-details">
            <div className="schema-virsio-download">
              {this.state.allSchemaList.length > 1 ? (
                <span
                  className="schema-version"
                  onClick={() => this.versionDetailModalFunc()}
                  data-tip
                  data-for="schemaVersions"
                >
                  <span>V{this.state.allSchemaList.length}</span>
                </span>
              ) : (
                ""
              )}
              <ReactTooltip
                id="schemaVersions"
                place="top"
                type="dark"
                effect="float"
              >
                {" "}
                <span>View all version</span>{" "}
              </ReactTooltip>
              <FontAwesomeIcon
                icon={faArrowCircleDown}
                className="schema-dowmload-icon"
                onClick={() => this.downLoadPdf()}
                data-tip
                data-for="schemaDownload"
              />
              <ReactTooltip
                id="schemaDownload"
                place="top"
                type="dark"
                effect="float"
              >
                {" "}
                <span>Download PDF</span>{" "}
              </ReactTooltip>
            </div>
            <div className="schema-table-header">
              <table>
                <thead>
                  <tr>
                    <th className="schema-fields-header">
                      <div className="schema-header-name">Fields</div>
                      <SearchInput
                        placeholder={this.state.searchFields}
                        handleSearchInputChange={this.handleSearchInputChange}
                      />
                    </th>
                    <th>
                      <div className="schema-header-name">Description</div>
                      <SearchInput
                        placeholder={this.state.searchDiscription}
                        handleSearchInputChange={
                          this.handleSearchCommentInputChange
                        }
                      />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="schema-table-body">
              <table>
                <tbody>
                  {this.state.allDescriptionList
                    .filter(data => {
                      return (
                        data.columnName
                          .toLowerCase()
                          .indexOf(this.state.searchData) > -1
                        // || data.comments[data.comments.length - 1].comment.toLowerCase().indexOf(this.state.searchData) > -1
                      );
                    })
                    .map((data, id) => {
                      return (
                        <tr key={id}>
                          <td className="schema-fields-data">
                            <span className="table-index">{id + 1}</span>
                            <div className="fielsd-wrap">
                              {data.comments && data.comments.length > 0 ? (
                                data.comments[data.comments.length - 1].comment
                                  .toLowerCase()
                                  .indexOf("PII") !== -1 ? (
                                  <div
                                    className="schema-col-name font-red"
                                    data-tip
                                    data-for={data.columnName}
                                  >
                                    {data.columnName}
                                  </div>
                                ) : data.comments[
                                    data.comments.length - 1
                                  ].comment
                                    .toLowerCase()
                                    .indexOf("derived") !== -1 ||
                                  data.comments[
                                    data.comments.length - 1
                                  ].comment
                                    .toLowerCase()
                                    .indexOf("encode") !== -1 ? (
                                  <div
                                    className="schema-col-name font-blue"
                                    data-tip
                                    data-for={data.columnName}
                                  >
                                    {data.columnName}
                                  </div>
                                ) : (
                                  <div
                                    className="schema-col-name"
                                    data-tip
                                    data-for={data.columnName}
                                  >
                                    {data.columnName}
                                  </div>
                                )
                              ) : (
                                <div
                                  className="schema-col-name"
                                  data-tip
                                  data-for={data.columnName}
                                >
                                  {data.columnName}
                                </div>
                              )}
                              <ReactTooltip
                                id={data.columnName}
                                place="right"
                                type="dark"
                                effect="float"
                              >
                                {" "}
                                <span>{data.columnName}</span>
                              </ReactTooltip>
                              {/* <span className="fields-tooltip">{data.columnName}</span> */}
                            </div>
                            <span
                              className="schema-type"
                              data-tip
                              data-for={id.toString()}
                            >
                              {" "}
                              {data.columnType === "string" ? "Abc" : "#"}
                              <ReactTooltip
                                id={id.toString()}
                                place="right"
                                type="dark"
                                effect="float"
                              >
                                {" "}
                                <span>{data.columnType}</span>
                              </ReactTooltip>
                            </span>
                          </td>
                          <td>
                            {data.comments && data.comments.length > 0 ? (
                              <span onBlur={this.stopCommentEdit.bind(this)}>
                                {this.state.showEditCommentTextarea &&
                                this.state.schemaDataIndex === id ? (
                                  <textarea
                                    autoFocus
                                    className="comment-textarea"
                                    defaultValue={
                                      this.state.schemaCurrentUpdateComment
                                    }
                                    onChange={this.handleCommentChange.bind(
                                      this,
                                      id,
                                      data.columnName,
                                      data.columnType,
                                      data.comments[data.comments.length - 1].pl
                                    )}
                                  />
                                ) : data.comments[
                                    data.comments.length - 1
                                  ].comment
                                    .toLowerCase()
                                    .indexOf("PII") !== -1 ? (
                                  <span className="schema-comment font-red">
                                    {" "}
                                    {
                                      data.comments[data.comments.length - 1]
                                        .comment
                                    }{" "}
                                  </span>
                                ) : data.comments[
                                    data.comments.length - 1
                                  ].comment
                                    .toLowerCase()
                                    .indexOf("derived") !== -1 ||
                                  data.comments[
                                    data.comments.length - 1
                                  ].comment
                                    .toLowerCase()
                                    .indexOf("encode") !== -1 ? (
                                  <span className="schema-comment font-blue">
                                    {" "}
                                    {
                                      data.comments[data.comments.length - 1]
                                        .comment
                                    }{" "}
                                  </span>
                                ) : (
                                  <span className="schema-comment">
                                    {" "}
                                    {
                                      data.comments[data.comments.length - 1]
                                        .comment
                                    }{" "}
                                  </span>
                                )}{" "}
                              </span>
                            ) : (
                              <span onBlur={this.stopCommentEdit.bind(this)}>
                                {this.state.showEditCommentTextarea &&
                                this.state.schemaDataIndex === id ? (
                                  <textarea
                                    autoFocus
                                    className="comment-textareass"
                                    defaultValue={
                                      this.state.schemaCurrentUpdateComment
                                    }
                                    onChange={this.handleCommentChange.bind(
                                      this,
                                      id,
                                      data.columnName,
                                      data.columnType,
                                      null
                                    )}
                                  />
                                ) : (
                                  ""
                                )}{" "}
                              </span>
                            )}
                            <span className="schema-icons">
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="schema-icon"
                                onClick={() =>
                                  this.versionCommentInfoModalFunc(id)
                                }
                              />
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                className="schema-icon"
                                onClick={() =>
                                  this.editCommentFunc(
                                    id,
                                    data.columnName,
                                    data.comments &&
                                      data.comments[data.comments.length - 1]
                                        .comment
                                  )
                                }
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {this.state.showPreviewBtn && !this.props.showStatus ? (
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-primary priview-btn"
                  onClick={this.previewCommentEdits}
                >
                  Preview
                </button>
              </div>
            ) : (
              ""
            )}
            {this.state.showVersionDetailModal ? (
              <Modal
                className="modal modal-dialog-scrollable version-detail-modal"
                size="lg"
                show={this.state.showVersionDetailModal}
                onHide={() => this.closeVersiondetailsModal()}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    Versions &nbsp;
                    <span className="total-version">
                      (total&nbsp;{this.state.allSchemaList.length})
                    </span>{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="vers-tbl-header tbl-to-col">
                    <table>
                      <thead>
                        {this.state.allSchemaList
                          .reverse()
                          .slice(0, 3)
                          .map((subitem, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  <span className="table-index"></span>
                                  <span>
                                    V{subitem.version}&nbsp;{" "}
                                    <span className="v-detail-date">
                                      {" "}
                                      ({formatDate(subitem.createdOn)})
                                    </span>
                                  </span>
                                  {this.state.allDescriptionList.version ===
                                  subitem.version ? (
                                    <FontAwesomeIcon
                                      icon={faArrowCircleDown}
                                      className="schema-dowmload-icon"
                                      onClick={() => this.downLoadPdf()}
                                      data-tip
                                      data-for="schemaDownload"
                                    />
                                  ) : this.state.allSchemaList[
                                      this.state.allSchemaList.length - 2
                                    ].version === subitem.version ? (
                                    <FontAwesomeIcon
                                      icon={faArrowCircleDown}
                                      className="schema-dowmload-icon"
                                      onClick={() => this.downLoadPdf2()}
                                      data-tip
                                      data-for="schemaDownload"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faArrowCircleDown}
                                      className="schema-dowmload-icon"
                                      onClick={() => this.downLoadPdf3()}
                                      data-tip
                                      data-for="schemaDownload"
                                    />
                                  )}
                                  <ReactTooltip
                                    id="schemaDownload"
                                    place="top"
                                    type="dark"
                                    effect="float"
                                  >
                                    <span>Download PDF</span>
                                  </ReactTooltip>
                                </td>
                              </tr>
                            );
                          })}
                      </thead>
                      {/* </table></div>
 <div className="tbl-to-col"><table> */}
                      <tbody>
                        {this.state.allSchemaList.slice(0, 3).map((subitem, i) => {
                          return (
                            <tr key={i}>
                              {subitem.schemaInfo
                                .sort((a, b) =>
                                  a.columnName > b.columnName ? 1 : -1
                                )
                                .map((data, id) => {
                                  return (
                                    <td className="schema-fields-data">
                                      <span className="table-index">
                                        {id + 1}
                                      </span>
                                      <span>{data.columnName}</span>
                                      <span
                                        className="schema-type"
                                        data-tip
                                        data-for={id.toString()}
                                      >
                                        {data.columnType === "string"
                                          ? "Abc"
                                          : "#"}
                                      </span>
                                      <ReactTooltip
                                        id={id.toString()}
                                        place="right"
                                        type="dark"
                                        effect="float"
                                      >
                                        <span>{data.columnType}</span>
                                      </ReactTooltip>
                                    </td>
                                  );
                                })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            ) : null}
            {this.state.showSchemaCommentInfoModal ? (
              <Modal
                className="modal modal-dialog-scrollable comment-info-modal"
                size="xl"
                show={this.state.showSchemaCommentInfoModal}
                onHide={() => this.closeCommentListInfoModal()}
              >
                {this.props.commentList && this.props.commentList.length > 0 ? (
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Description Version Details for{" "}
                      {this.state.schemaFieldName}{" "}
                    </Modal.Title>
                  </Modal.Header>
                ) : (
                  <Modal.Header closeButton className="data-not-available">
                    <Modal.Title>
                      Description Version Details Not available{" "}
                    </Modal.Title>
                  </Modal.Header>
                )}
                <Modal.Body>
                  {this.props.commentList &&
                  this.props.commentList.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Version#</th>
                          <th>Description</th>
                          <th className="propagated-level">Propagated Level</th>
                          <th className="propagated-by">Propagated By</th>
                          <th className="comments-date">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.commentList &&
                          this.props.commentList
                            .reverse()
                            .map((comment, commentId) => {
                              return (
                                <tr key={commentId}>
                                  <td>{comment.version}</td>
                                  <td className="propagated-level">
                                    {" "}
                                    {comment.comment}{" "}
                                  </td>
                                  <td className="propagated-level">
                                    {comment.pl === "G" ? (
                                      <span>All tables</span>
                                    ) : comment.pl === "A" ? (
                                      <span>Application</span>
                                    ) : comment.pl === "S" ? (
                                      <span>Service</span>
                                    ) : comment.pl === "L" ? (
                                      <span>Local</span>
                                    ) : null}
                                  </td>
                                  <td className="propagated-by">
                                    {comment.un}
                                  </td>
                                  <td className="comments-date">
                                    {" "}
                                    {comment.date}{" "}
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </Modal.Body>
              </Modal>
            ) : null}
            {this.state.showEditCommentModal ? (
              <Modal
                className="modal modal-dialog-scrollable edit-comment-modal"
                size="xl"
                show={this.state.showEditCommentModal}
                onHide={() => this.closeEditCommentsModal()}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Save the description changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table>
                    <thead>
                      <tr>
                        <th className="save-column-name">Column Name</th>
                        <th>Column Description</th>
                        <th className="save-check-box">
                          Select description(s) to save
                          <br />
                          <input
                            name="selcetAllComment"
                            type="checkbox"
                            checked={this.state.isAllSelected}
                            onChange={this.handleCheckComment}
                          />
                          &nbsp;Check / Uncheck All
                        </th>
                        <th className="save-select-pl">
                          Select Propogation level
                        </th>
                        <th className="save-current-pl">
                          Current Propogation level
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.UpdatedCommentsList.map((data, id) => {
                        //("test>>>>1", data.comments && data.comments.map(subdata => subdata.pl));
                        return (
                          <tr key={id}>
                            <td>{data.columnName}</td>
                            <td>
                              {" "}
                              {data.comments &&
                                data.comments.map(
                                  subdata => subdata.comment
                                )}{" "}
                            </td>
                            <td className="comment-check">
                              <input
                                name={data.columnName}
                                type="checkbox"
                                checked={
                                  data.currentChecked
                                    ? data.currentChecked
                                    : false
                                }
                                onChange={event =>
                                  this.handleCheckComment(
                                    event,
                                    id,
                                    data.columnName
                                  )
                                }
                              />
                            </td>
                            <td className="select-pl">
                              <Select
                                className="select-pl-op"
                                value={this.state.propogationSelectedValue[id]}
                                onChange={event =>
                                  this.handleSelectPropogationChange(
                                    event,
                                    id,
                                    data.columnName
                                  )
                                }
                                options={options}
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              {data.comments &&
                                data.comments.map(subdata =>
                                  subdata.pl === "G" ? (
                                    <span>All tables</span>
                                  ) : subdata.pl === "A" ? (
                                    <span>Application</span>
                                  ) : subdata.pl === "S" ? (
                                    <span>Service</span>
                                  ) : subdata.pl === "L" ? (
                                    <span>Local</span>
                                  ) : (
                                    <span>no comment added</span>
                                  )
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-secondary"
                    onClick={this.discardCommentChanges}
                  >
                    discard all changes
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.saveCommentChanges}
                  >
                    save selected comments
                  </button>
                </Modal.Footer>
              </Modal>
            ) : null}
          </div>
        ) : (
          <DataError dataErrorMsg={this.state.dataErrorMsg} />
        )}
      </div>
    );
  }
}
//export default Schema;
const mapStateToProps = state => {
  const { TabelReducer } = state;
  return {
    commentList: TabelReducer ? TabelReducer.commentList : [],
    showStatus: TabelReducer ? TabelReducer.showStatus : ""
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Schema);
