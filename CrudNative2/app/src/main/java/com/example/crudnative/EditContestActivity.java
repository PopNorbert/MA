package com.example.crudnative;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.Calendar;
import java.util.Date;

public class EditContestActivity extends Activity {

    private EditText editName, editLocation;
    private Spinner editCategory;
    private DatePicker editDate;
    private Contest contest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_contest);

        
        contest = (Contest) getIntent().getSerializableExtra("contest");

        
        editName = findViewById(R.id.editName);
        editCategory = findViewById(R.id.editCategory); 
        editLocation = findViewById(R.id.editLocation);
        editDate = findViewById(R.id.editDate);

        
        editName.setText(contest.name);
        editLocation.setText(contest.location);

        
        ArrayAdapter<Category> categoryAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, Category.values());
        categoryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        editCategory.setAdapter(categoryAdapter);

        
        editCategory.setSelection(getCategoryPosition(contest.category));

        
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(contest.date);
        editDate.updateDate(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH));

        
        Button saveButton = findViewById(R.id.saveButton);
        saveButton.setOnClickListener(v -> saveContest());
    }

    private int getCategoryPosition(Category category) {
        for (int i = 0; i < Category.values().length; i++) {
            if (Category.values()[i] == category) {
                return i;
            }
        }
        return 0; 
    }

    private void saveContest() {
        
        contest.name = editName.getText().toString();
        contest.location = editLocation.getText().toString();

        
        contest.category = (Category) editCategory.getSelectedItem();

        
        int year = editDate.getYear();
        int month = editDate.getMonth();
        int day = editDate.getDayOfMonth();
        contest.date = new Date(year - 1900, month, day); 

        
        Intent resultIntent = new Intent();
        resultIntent.putExtra("updatedContest", contest);
        setResult(RESULT_OK, resultIntent);
        finish();
    }
}
