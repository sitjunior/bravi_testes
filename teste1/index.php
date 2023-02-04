<?php
/*
1. Suportes balanceados

Escreva uma função que receba uma string de colchetes como entrada e determine se a
ordem dos parênteses é válido. Um colchete é considerado qualquer um dos seguintes
caracteres: (, ), {, }, [, ou ].
Dizemos que uma sequência de colchetes é válida se as seguintes condições forem
atendidas:
● Não contém colchetes sem correspondência.
● O subconjunto de colchetes dentro dos limites de um par de colchetes correspondente é
também um par de colchetes.

Exemplos:
● (){}[] é válido
● [{()}](){} é válido
● []{() não é válido
● [{)] não é válido
*/

// Informa aqui a sequência
$sequences = [
    '(){}[]',
    '[{()}](){}',
    '[]{()',
    '[{)]',
    '[]{()}',
    '[{]}',
    '()}'
];

$return = [];
foreach ($sequences as $sequence) {
    echo $sequence.' - ';
    
    if ( sequence_analysis($sequence) ) {
        echo 'A sequência está correta!<br/>'."\n";

    } else {
        echo 'A sequência está incorreta!<br/>'."\n";
    }
}

function sequence_analysis($string) {
    $array = str_split($string);
    
    $correspondences = [
        '{' => '}',
        '(' => ')',
        '[' => ']'
    ];
    $final_char = $sequence = '';
    $count = 0;
    
    foreach ($array as $char) {
        if ($sequence == '') {
            $final_char = isset($correspondences[$char]) ? $correspondences[$char] : '';
        }

        $sequence .= $char;
        $count++;

        if ($char == $final_char || count($array) == $count ) {
            //echo '(Z - '.$sequence.') ';
            //echo '('.count($array).' == '.$count.') ';
            $array2 = str_split($sequence);
    
            $char1 = $char2 = $char3 = 0;
            foreach ($array2 as $charr) {
                ($charr === '(') ? $char1++ : 0;
                ($charr == ')') ? $char1++ : 0;
                ($charr == '[') ? $char2++ : 0;
                ($charr == ']') ? $char2++ : 0;
                ($charr == '{') ? $char3++ : 0;
                ($charr == '}') ? $char3++ : 0;

                ($char1 == 2) ? $char1 = 0 : 0;
                ($char2 == 2) ? $char2 = 0 : 0;
                ($char3 == 2) ? $char3 = 0 : 0;
            }

            if ($char1 > 0 || $char2 > 0 || $char3 > 0) {
                return false;
            }

            $sequence = '';
        }

        //echo '('.count($array).' == '.$count.') ';
    }

    return true;
}
