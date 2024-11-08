package com.example.crudnative;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Calendar;
import java.util.Date;

public class CreateContestActivity extends AppCompatActivity {
    private EditText nameEditText;
    private Spinner categorySpinner;
    private EditText locationEditText;
    private DatePicker editDate;
    private Button saveButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_contest);


        nameEditText = findViewById(R.id.nameEditText);
        categorySpinner = findViewById(R.id.categorySpinner);
        locationEditText = findViewById(R.id.locationEditText);
        editDate = findViewById(R.id.editDate);
        saveButton = findViewById(R.id.saveButton);


        ArrayAdapter<Category> categoryAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, Category.values());
        categoryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        categorySpinner.setAdapter(categoryAdapter);


        saveButton.setOnClickListener(v -> {

            String name = nameEditText.getText().toString();
            String location = locationEditText.getText().toString();
            Category category = (Category) categorySpinner.getSelectedItem();


            if (!name.isEmpty() && !location.isEmpty()) {

                int day = editDate.getDayOfMonth();
                int month = editDate.getMonth();
                int year = editDate.getYear();


                Calendar calendar = Calendar.getInstance();
                calendar.set(year, month, day);
                Date date = calendar.getTime();


                Contest newContest = new Contest(String.valueOf(System.currentTimeMillis()), name, category, location, date);


                Intent resultIntent = new Intent();
                resultIntent.putExtra("newContest", newContest);
                setResult(RESULT_OK, resultIntent);
                finish();
            } else {
                Toast.makeText(CreateContestActivity.this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
