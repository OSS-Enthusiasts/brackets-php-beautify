Brackets PHP Beautify
=========
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![Node CI Tests](https://github.com/nadchif/brackets-php-beautify/workflows/Node%20CI%20Tests/badge.svg) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
[<img src="https://img.shields.io/badge/slack-@ossenthusiasts-maroon.svg?logo=slack">](https://join.slack.com/t/ossenthusiasts/shared_invite/zt-eh9g0u7k-l2uUmCCBhUTHY8EWZFShIw)

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
Contributions and suggestions are very welcome and wanted. We try to respond to pull requests within 48 hours. For more information see [CONTRIBUTING.md](https://github.com/nadchif/brackets-php-beautify/blob/master/CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Shankhanil"><img src="https://avatars0.githubusercontent.com/u/17963889?v=4" width="100px;" alt=""/><br /><sub><b>Shankhanil Ghosh</b></sub></a><br /><a href="https://github.com/OSS-Enthusiasts/brackets-php-beautify/commits?author=Shankhanil" title="Code">💻</a> <a href="https://github.com/OSS-Enthusiasts/brackets-php-beautify/commits?author=Shankhanil" title="Tests">⚠️</a> <a href="#ideas-Shankhanil" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://aboutchif.com"><img src="https://avatars0.githubusercontent.com/u/47924887?v=4" width="100px;" alt=""/><br /><sub><b>Dan Chif</b></sub></a><br /><a href="https://github.com/OSS-Enthusiasts/brackets-php-beautify/commits?author=nadchif" title="Code">💻</a> <a href="https://github.com/OSS-Enthusiasts/brackets-php-beautify/commits?author=nadchif" title="Tests">⚠️</a> <a href="#maintenance-nadchif" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
