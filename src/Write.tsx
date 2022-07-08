import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface IProps {
  isModifyMode: boolean;
  boardId: number;
  handleCancel: any;
}
class Write extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isRendered: false,
    };
  }

  state = {
    title: "",
    content: "",
    isRendered: false,
  };

  write = () => {
    axios
      .post("http://localhost:8000/insert", {
        title: this.state.title,
        content: this.state.content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  update = () => {
    axios
      .post("http://localhost:8000/update", {
        title: this.state.title,
        content: this.state.content,
        id: this.props.boardId,
      })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  detail = () => {
    axios
      .get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            title: res.data[0].BOARD_TITLE,
            content: res.data[0].BOARD_CONTENT,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // eslint-disable-next-line
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Form>
          {/* 내용입력시 state에 입력내용을 전달 */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="제목을 입력하세요."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="내용을 입력하세요."
            />
          </Form.Group>
          {/* 작성완료 버튼 event */}
          <Button
            variant="info"
            onClick={this.props.isModifyMode ? this.update : this.write}
          >
            작성완료
          </Button>
          <Button variant="secondary" onClick={this.props.handleCancel}>
            취소
          </Button>
        </Form>
      </div>
    );
  }
}
export default Write;
