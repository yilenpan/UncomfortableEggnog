# Jarvis - Web Application

> Javis - Web Application is the web component of our [Jarvis Voice Command](https://github.com/UncomfortableEggnog/UncomfortableEggnog-Desktop) Desktop Application for Mac OS.  The web application is deployed at [voicecommand.herokuapp.com](https://voicecommand.herokuapp.com).  You can download the desktop application, create and share packages directly from our website.

## Team

  - __Product Owner__: Mitchell Wilcox
  - __Scrum Master__: Tracy Duong
  - __Development Team Members__: Andres Morales, Yilen Pan

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> - __Download Jarvis Voice Command Desktop Application__
> Download Jarvis Voice Command Desktop Application for Mac OS at [voicecommand.herokuapp.com](http://voicecommand.herokuapp.com).  Jarvis is not available for Windows or Linux.


> - __Sign up / Log in__
> You can sign up directly through our [website](https://http://voicecommand.herokuapp.com/#/signup).  Or if you have a GitHub, Google or Facebook account, you can skip the sign up, and [log in](http://http://voicecommand.herokuapp.com/#/login) through our web portal.


> - __Create a package__
> To create a package, you need to be logged in.  Start by going to the [create package](http://http://voicecommand.herokuapp.com/#/package/create) page, or navigate to it from [My Account](http://http://voicecommand.herokuapp.com/#/user/tpduong) page.
>
>  - **title**: Required field, limited to 15 characters of letters, numbers and spaces.
>
>  - **command**: The phrase you tell Jarvis to execute the corresponding action
>
>  - **action**: The shell script to be executed upon utterance of the corresponding command.  You can have zero, one, or multiple arguments in an action.  
>    - Arguments must be in the following format: _< ARG del='+' quote=true case='proper' >_
>    - del specifies the delimiter.
>    - quote specifies if the argument is surrounded by quotes.  Values can either be true or false.
>    - case specifies whether the argument is 'upper', 'lower' or 'proper' case.
>    - Ex: "open https://en.wikipedia.org/wiki/< ARG del='_' / >"
>
>
> - __Edit or Delete a package__
>
> - __Search packages by title or description__
> - __Add a review / Rate a package__




## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
