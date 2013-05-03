# jQuery Countdown Timer Plugin
This is a simple countdown timer I wrote for an app I was working on.
Displays a simple countdown timer in an HTML element

##Initilization and Methods
The plugin can be initialized with an optional duration and/or a callback function to execute on completion.

    $(element).timer([method flag], [durationInMinutes], [function]);

    $(element).timer();
    $(element).timer(durationInMinutes);
    $(element).timer(durationInMinutes, function);
    $(element).timer(function);

To start the timer on initialization, pass the 'start' flag along with the other optional arguments

    $(element).timer('start', [durationInMinutes], [function]);

Otherwise, start the timer by passing the start flag after initialization
    
    $(element).timer('start');

Also accepts 'init' method flag, though it's more or less unnecessary since it's called by default if no flags are passed.



This is my first jQuery plugin, so any comments or suggestions are welcome.