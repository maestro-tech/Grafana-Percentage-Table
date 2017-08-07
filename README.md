# Percentage Grafana plugin

## How it's work

You need to make two querys, the first query represent an integer nominator and the seconde the interger denomitor of the division.
The result on your table panel will be printed with all result already mutiply by 100.
Querys must be format as *table*.

## Build

```bash
$> git clone https://github.com/maestro-tech/Grafana-Percentage
$> cd Grafana-Percentage
$> grunt
```
You can now move Grafana-Percentage to the plugin directory of your Grafana installation
```
$GRAFANA_DIR/data/plugins
```
