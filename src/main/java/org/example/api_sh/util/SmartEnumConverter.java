package org.example.api_sh.util;

import java.util.Arrays;

public class SmartEnumConverter {

    public static <T extends Enum<T>> T smartMatch(Class<T> enumClass, String input) {
        return Arrays.stream(enumClass.getEnumConstants())
                .filter(e -> normalize(e.name()).equals(normalize(input)))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No enum match for value: " + input));
    }

    private static String normalize(String value) {
        return value
                .toLowerCase()
                .replace("_", "")
                .replace(" ", "");
    }
}