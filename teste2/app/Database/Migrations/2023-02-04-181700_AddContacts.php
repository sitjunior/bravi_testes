<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddContacts extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 10,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'people_id' => [
                'type'       => 'INT',
                'constraint' => 10,
                'unsigned'       => true
            ],
            'type' => [
                'type'       => 'CHAR',
                'constraint' => 1,
            ],
            'label' => [
                'type'       => 'VARCHAR',
                'constraint' => 50,
            ],
            'value' => [
                'type'       => 'VARCHAR',
                'constraint' => 50,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('people_id', 'people', 'id');
        $this->forge->createTable('contacts');
    }

    public function down()
    {
        $this->forge->dropTable('contacts');
    }
}