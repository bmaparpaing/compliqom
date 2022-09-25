
import { DictionaryService } from '@/dictionary-service';
import { describe, expect, it } from 'vitest';

describe('DictionaryService', function () {

    // Tests de la méthode isWordValid()
    // Pré-requis pour appeler cette méthode : le dictionnaire doit avoir été initialisé (condition toujours respectée au runtime puisqu'on charge le dictionnaire.
    // dans le hook onBeforeMount avec 'await'. Pour nos test, on va donc utiliser un mock du dictionnaire.

    DictionaryService.allowedWords = [ 'abricot', 'banane', 'citron' ];

    it('check if a invalid word is considered as invalid', function () {
        expect(DictionaryService.isWordValid('frambouhaze')).toBeFalsy();
    });

    it('check if a valid word is considered as valid', function () {
        expect(DictionaryService.isWordValid('banane')).toBeTruthy();
    });
});
