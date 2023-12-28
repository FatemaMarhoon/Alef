'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Requests', 'plan_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Subscription_Plans',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Requests', ['plan_id']); // Add index for plan_id

    // await queryInterface.addColumn('Requests', 'status_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Request_Statuses',
    //     key: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    // });

    // await queryInterface.addIndex('Requests', ['status_id']); // Add index for status_id

    await queryInterface.addColumn('Preschools', 'address_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Addresses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Preschools', ['address_id']); // Add index for address_id

    await queryInterface.addColumn('Preschools', 'request_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Preschools', ['request_id']); // Add index for request_id
    await queryInterface.addColumn('Applications', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Applications', ['user_id']); // Add index for user_id
    await queryInterface.addColumn('Applications', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Applications', ['preschool_id']); // Add index for preschool_id

    await queryInterface.addColumn('Appointments', 'application_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Applications',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Appointments', ['application_id']); // Add index for application_id

    await queryInterface.addColumn('Payments', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Payments', ['student_id']); // Add index for student_id
    await queryInterface.addColumn('Logs', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Logs', ['user_id']); // Add index for user_id
    await queryInterface.addColumn('Notifications', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Notifications', ['user_id']); // Add index for user_id
    await queryInterface.addColumn('Application_Evaluations', 'application_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Applications',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Application_Evaluations', ['application_id']); // Add index for application_id
    await queryInterface.addColumn('Attachments', 'request_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Stationary_Requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Attachments', ['request_id']); // Add index for request_id
    await queryInterface.addColumn('Stationary_Requests', 'staff_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Staffs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Stationary_Requests', 'stationary_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Stationaries',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Staffs', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Events', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Classes', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Classes', 'supervisor', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Staffs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Students', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Students', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Students', 'class_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Attendances', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Grade_Capacities', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Student_Evaluations', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Reports', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Preschool_Media', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Stationaries', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },












  async down (queryInterface, Sequelize) {
    // await queryInterface.removeIndex('Requests', ['plan_id']); // Remove index for plan_id
    // await queryInterface.removeColumn('Requests', 'plan_id');

    // await queryInterface.removeIndex('Requests', ['status_id']); // Remove index for status_id
    // await queryInterface.removeColumn('Requests', 'status_id');

    // await queryInterface.removeIndex('Preschools', ['address_id']); // Remove index for address_id
    // await queryInterface.removeColumn('Preschools', 'address_id');

    // await queryInterface.removeIndex('Preschools', ['request_id']); // Remove index for request_id
    // await queryInterface.removeColumn('Preschools', 'request_id');
    // await queryInterface.removeIndex('Applications', ['user_id']); // Remove index for user_id
    // await queryInterface.removeColumn('Applications', 'user_id');

    // await queryInterface.removeIndex('Applications', ['preschool_id']); // Remove index for preschool_id
    // await queryInterface.removeColumn('Applications', 'preschool_id');

    // await queryInterface.removeIndex('Appointments', ['application_id']); // Remove index for application_id
    // await queryInterface.removeColumn('Appointments', 'application_id');

    // await queryInterface.removeIndex('Payments', ['student_id']); // Remove index for student_id
    // await queryInterface.removeColumn('Payments', 'student_id');
    // await queryInterface.removeIndex('Logs', ['user_id']); // Remove index for user_id
    // await queryInterface.removeColumn('Logs', 'user_id');
    // await queryInterface.removeIndex('Notifications', ['user_id']); // Remove index for user_id
    // await queryInterface.removeColumn('Notifications', 'user_id');
    // await queryInterface.removeIndex('Application_Evaluations', ['application_id']); // Remove index for application_id
    // await queryInterface.removeColumn('Application_Evaluations', 'application_id');
    // await queryInterface.removeIndex('Attachments', ['request_id']); // Remove index for request_id
    // await queryInterface.removeColumn('Attachments', 'request_id');
    // await queryInterface.removeColumn('Stationary_Requests', 'staff_id');
    // await queryInterface.removeColumn('Stationary_Requests', 'stationary_id');
    // await queryInterface.removeColumn('Staffs', 'preschool_id');
    // await queryInterface.removeColumn('Events', 'created_by');
    // await queryInterface.removeColumn('Classes', 'preschool_id');
    // await queryInterface.removeColumn('Classes', 'supervisor');

    // await queryInterface.removeColumn('Students', 'user_id');
    // await queryInterface.removeColumn('Students', 'preschool_id');
    // await queryInterface.removeColumn('Students', 'class_id');
    // await queryInterface.removeColumn('Attendances', 'student_id');

    // await queryInterface.removeColumn('Grade_Capacity', 'preschool_id');
    // await queryInterface.removeColumn('Student_Evaluations', 'student_id');

    // await queryInterface.removeColumn('Reports', 'preschool_id');
    // await queryInterface.removeColumn('Preschool_Media', 'preschool_id');
    // await queryInterface.removeColumn('Stationaries', 'preschool_id');
  }
};
