package utils;

class Random {
    public static function randomize(min: Int, max: Int): Int {
		return min + Math.round(Math.random() * (max - min));
	}
}