Brackets PHP Beautify
=========

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![Node CI Tests](https://github.com/nadchif/brackets-php-beautify/workflows/Node%20CI%20Tests/badge.svg) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
[<img src="https://img.shields.io/badge/slack-@ossenthusiasts-brown.svg?logo=slack">](https://ossenthusiasts.slack.com/)

Simple install-and-use code formatter (beautifier) PHP in Brackets that works right out the box. 
- No extra configuration need, 
- No need to set location for PHP Binary

![Brackets Context Menu](https://raw.githubusercontent.com/nadchif/brackets-php-beautify/master/screenshots/contextmenu.png)

**BEFORE**
```
<?php
for($i = 0; $i < 10; $i++)
{
if($i%2==0)
{
echo "Flipflop";  
}
}
```
**AFTER**
```
<?php
for ( $i = 0; $i < 10; $i++ ) {
    if ( $i%2 == 0 ) {
        echo 'Flipflop';

    }
}
```

This is an adaptation of [php-formatter](https://github.com/chuaple/php-formatter) by [@chuaple](https://github.com/chuaple)


## License

Apache-2.0

## Contributions
Contributions and suggestions are very welcome and wanted. I try to respond to pull requests within 48 hours. For more information see [CONTRIBUTING.md](https://github.com/nadchif/brackets-php-beautify/blob/master/CONTRIBUTING.md).
