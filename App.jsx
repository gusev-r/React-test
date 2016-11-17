import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {   
	render() {
	var my_news = [
	  {
		author: 'Саша Печкин',
		text: 'В четчерг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	  },
	  {
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'А евро 42!'
	  },
	  {
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
	  }
	];
      return (
	  <div className="app">
        <h3>Новости</h3>
        <News  data={my_news}/>
		<Add />
      </div>
      );
   }
}

class News extends React.Component {
	
   render() {
	var data = this.props.data;
	if (data.length > 0) {
		var newsTemplate = data.map(function(item, index) {
		  return (
			<div key={index}>
				<Article data={item} />
			</div>
		  )
		});
	} else {
		newsTemplate = <p>К сожалению новостей нет</p>
	}
    console.log(newsTemplate);
	return (
	<div className="news">
		{newsTemplate}
		<strong  className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
	</div>
	);
   }
}
News.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
	})).isRequired,
}


var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        <a 
			href="#" 
			onClick={this.readmoreClick} 
			className={'news__readmore ' + (visible ? 'none': '')}
			>Подробнее</a>
        <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
});
// --- добавили test input ---
var Add  = React.createClass({
  getInitialState: function() { //устанавливаем начальное состояние (state)
    return {
      btnIsDisabled: true
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
  },
  onCheckRuleClick: function(e) {
    this.setState({btnIsDisabled: !this.state.btnIsDisabled}); //устанавливаем значение в state
  },
  render: function() {

 return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Ваше имя'
          ref='author'
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст новости'
          ref='text'
        ></textarea>
		<label className='add__checkrule'>
		  <input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
		</label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={this.state.btnIsDisabled}
          >          Показать alert
        </button>
      </form>
    );
  }
});
export default App;