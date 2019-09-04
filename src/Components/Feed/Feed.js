import React from 'react';
import ShowMsg from '../Alert/Alert';
import './Feed.css';

const Alert = new ShowMsg();

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.shareBtn = React.createRef();
    }

    componentDidMount() {
        this.shareBtn.current.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: "Noticia del portal",
                    text: this.props.this.props.title.toLowerCase(),
                    url: `https://portal.ingenieria.usac.edu.gt/index.php/${this.props.href}`
                })
                    .then(() => console.log('Successfully share'))
                    .catch((error) => console.log('Error sharing', error));
            } else {
                let inputCp = document.createElement("input");
                inputCp.value = `https://portal.ingenieria.usac.edu.gt/index.php/${this.props.href}`
                document.body.appendChild(inputCp);
                inputCp.select();
                document.execCommand("copy");

                Alert.showMsg({
                    title: "Link copiado",
                    body: "Revisa tu portapapeles para ver la url de la noticia en el portal de ingenieria.",
                    type: "alert"
                })

                document.body.removeChild(inputCp);
                inputCp = undefined;
            }
        })
    }

    render() {
        console.log(this.props.link);
        return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card z-depth-1">
                        <div className="card-image">
                            <img src={`https://portal.ingenieria.usac.edu.gt/cache/mod_bt_contentslider/${this.props.preSrc}`} className="materialboxed" alt={this.props.title} />
                        </div>
                        <div className="card-content">
                            <span className="btn-floating waves-effect waves-dark white" ref={this.shareBtn}>
                                <i className="material-icons">share</i>
                            </span>
                            <span className="card-title">{this.props.title.toLowerCase()}</span>
                            <p className="card-text">
                                {this.props.text.toLowerCase()}<br className={this.props.link ? 'show' : 'hide'} /><br className={this.props.link ? 'show' : 'hide'} />
                                <a className={this.props.link ? 'show' : 'hide'} href={this.props.link}>{this.props.link}</a>
                            </p>
                        </div>
                        <div className="card-action">
                            <a href={`https://portal.ingenieria.usac.edu.gt/index.php/${this.props.href}`} className="waves-effect">
                                <i className="material-icons">collections</i> VER NOTICIA
                            </a>
                            <a download className="waves-effect" href={`https://portal.ingenieria.usac.edu.gt/images/${this.props.preSrc.substr(this.props.preSrc.indexOf("-") + 1)}`}>
                                <i className="material-icons">arrow_downward</i> DESCARGAR
                            </a>
                        </div >
                    </div >
                </div >
            </div >
        )
    }
}

export default Feed;
