package com.example.crudnative;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AlertDialog;
import androidx.annotation.NonNull;

import java.util.List;

public class ContestAdapter extends ArrayAdapter<Contest> {
    private final ActivityResultLauncher<Intent> editContestResultLauncher;
    public ContestAdapter(Context context, List<Contest> contests, ActivityResultLauncher<Intent> editContestResultLauncher) {
        super(context, 0, contests);
        this.editContestResultLauncher = editContestResultLauncher;
    }

    @NonNull
    @Override
    public View getView(int position, View convertView, @NonNull ViewGroup parent) {
        Contest contest = getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.contest, parent, false);
        }

        TextView nameTextView = convertView.findViewById(R.id.contestName);
        TextView categoryTextView = convertView.findViewById(R.id.contestCategory);
        TextView locationTextView = convertView.findViewById(R.id.contestLocation);
        TextView dateTextView = convertView.findViewById(R.id.contestDate);
        Button deleteButton = convertView.findViewById(R.id.deleteButton);
        Button updateButton = convertView.findViewById(R.id.updateButton);

        nameTextView.setText(contest.name);
        categoryTextView.setText(contest.category != null ? contest.category.toString() : "N/A");
        locationTextView.setText(contest.location);
        dateTextView.setText(contest.date != null ? contest.date.toString() : "N/A");

        
        categoryTextView.setText(contest.category != null ? contest.category.toString() : "N/A");

        
        deleteButton.setOnClickListener(v -> {
            new AlertDialog.Builder(getContext())
                    .setMessage("Are you sure you want to delete this contest?")
                    .setCancelable(false)
                    .setPositiveButton("Yes", (dialog, id) -> {
                        remove(contest);
                        notifyDataSetChanged();
                        Toast.makeText(getContext(), "Contest deleted", Toast.LENGTH_SHORT).show();
                    })
                    .setNegativeButton("No", (dialog, id) -> dialog.dismiss())
                    .create()
                    .show();
        });

        updateButton.setOnClickListener(v -> {
            
            Intent intent = new Intent(getContext(), EditContestActivity.class);
            intent.putExtra("contest", contest);

            
            editContestResultLauncher.launch(intent);
        });

        return convertView;
    }
}
